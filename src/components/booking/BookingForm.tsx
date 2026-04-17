import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, CalendarDays } from 'lucide-react';
import type { BookingState } from './bookingTypes';
import { useState } from 'react';
import { ref, push, onValue, get } from "firebase/database";
import { database } from "../../config/firebaseConfig";
const roomOptions = [
  { id: 'standard', name: '🛏 Standard Room', price: 120 },
  { id: 'deluxe', name: '🌿 Deluxe Room', price: 150 },
  { id: 'mountain', name: '🏔 Mountain View Suite', price: 175 },
  { id: 'pool', name: '♾ Infinity Pool Suite', price: 195 },
  { id: 'indrajith', name: '🌅 Indrajith Sunrise Suite', price: 220 },
  { id: 'villa', name: '🏡 Private Villa', price: 350 },
];

type Props = {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
};

const inputClass = "w-full bg-transparent border-none border-b border-mist py-4 font-dmSans text-[15px] text-cream outline-none focus:border-gold transition-colors duration-300";

const BookingForm = ({ state, setState }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const setVal = (key: keyof BookingState, val: string | number | boolean) => {
    setState(prev => ({ ...prev, [key]: val }));
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const getLabelClass = (field: string, val: string) => {
    const active = focusedField === field || (typeof val === 'string' && val.trim().length > 0) || (typeof val === 'number' && val > 0);
    return `absolute left-0 transition-all duration-300 pointer-events-none ${active
      ? '-top-[8px] text-[11px] font-jost uppercase tracking-[0.1em] text-gold'
      : 'top-[16px] text-[14px] font-dmSans text-fog'
      }`;
  };

  const isStep1Valid = state.guestName && state.email && state.phone && state.address && state.idNumber && state.numberOfGuests > 0;
  const isStep2Valid = state.checkIn && state.checkOut && state.roomType && state.rooms > 0;
  const isStep3Valid = !!state.paymentMethod && !!state.paymentStatus && !!state.bookingSource;



  // Check room availability for selected dates
const checkRoomAvailability = async (roomType: string, checkIn: string, checkOut: string) => {
  try {
    const bookingsRef = ref(database, "bookings");
    const snapshot = await get(bookingsRef);
    
    if (!snapshot.exists()) {
      return true; // No bookings yet, room is available
    }

    const bookings = snapshot.val();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find the room ID that matches our roomType
    const roomsRef = ref(database, "rooms");
    const roomsSnapshot = await get(roomsRef);
    
    if (!roomsSnapshot.exists()) {
      return true; // No rooms in database yet
    }

    const rooms = roomsSnapshot.val();
    const matchingRoom = Object.entries(rooms).find(([_, room]: [string, any]) => 
      room.name === roomType
    );

    if (!matchingRoom) {
      return true; // Room type not found in database, allow booking
    }

    const roomId = matchingRoom[0];

    // Check if this room is already booked for these dates
    for (const [_, booking] of Object.entries(bookings) as [string, any][]) {
      // Skip cancelled bookings
      if (booking.status === "Cancelled") continue;
      
      // Only check bookings for this specific room
      if (booking.roomId !== roomId) continue;

      const bookedCheckIn = new Date(booking.checkInDate);
      const bookedCheckOut = new Date(booking.checkOutDate);

      // Check for date overlap
      if (
        (checkInDate >= bookedCheckIn && checkInDate < bookedCheckOut) ||
        (checkOutDate > bookedCheckIn && checkOutDate <= bookedCheckOut) ||
        (checkInDate <= bookedCheckIn && checkOutDate >= bookedCheckOut)
      ) {
        return false; // Room is not available
      }
    }

    return true; // Room is available
  } catch (error) {
    console.error("Error checking availability:", error);
    return true; // On error, allow booking (fail open)
  }
};
  const handleNext = () => setVal('step', state.step + 1);
  const handlePrev = () => setVal('step', state.step - 1);


const handleConfirm = async () => {
  // First check if room is available
  if (state.roomType && state.checkIn && state.checkOut) {
    const isAvailable = await checkRoomAvailability(
      state.roomType, 
      state.checkIn, 
      state.checkOut
    );

    if (!isAvailable) {
      alert(`Sorry, ${state.roomType} is not available for these dates. Please select different dates or another room type.`);
      return;
    }
  }

  try {
    // Calculate nights
    const checkInDate = new Date(state.checkIn);
    const checkOutDate = new Date(state.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)));

    // Find the matching room in database to get roomId
    const roomsRef = ref(database, "rooms");
    const roomsSnapshot = await get(roomsRef);
    let roomId = "";
    let roomPrice = state.roomPrice;

    if (roomsSnapshot.exists()) {
      const rooms = roomsSnapshot.val();
      const matchingRoom = Object.entries(rooms).find(([_, room]: [string, any]) => 
        room.name === state.roomType
      );
      if (matchingRoom) {
        roomId = matchingRoom[0];
        roomPrice = matchingRoom[1].price;
      }
    }

    // Prepare booking data
    const bookingData = {
      // Guest Information
      guestName: state.guestName,
      guestEmail: state.email,
      guestPhone: state.phone,
      guestAddress: "",
      guestIdNumber: "",
      numberOfGuests: state.adults + state.children,

      // Booking Details
      roomId: roomId,
      checkInDate: state.checkIn,
      checkOutDate: state.checkOut,
      numberOfNights: nights,

      // Pricing
      roomRate: roomPrice,
      additionalCharges: 0,
      discount: 0,
      totalAmount: roomPrice * nights * state.rooms,
      paidAmount: 0,

      // Payment & Status
      paymentMethod: "Pending",
      paymentStatus: "Pending",
      bookingSource: "Website",
      status: "Confirmed",

      // Additional
      specialRequests: state.requests,
      notes: "",
      country: state.country,

      // Metadata
      createdAt: Date.now(),
      createdBy: "website",
      updatedAt: Date.now(),
    };

    // Save to Firebase
    const bookingsRef = ref(database, "bookings");
    await push(bookingsRef, bookingData);

    // Mark as submitted
    setVal('isSubmitted', true);
  } catch (error) {
    console.error("Error saving booking:", error);
    alert("There was an error processing your booking. Please try again or contact us directly.");
  }
};


  let nights = 0;
  if (state.checkIn && state.checkOut) {
    const d1 = new Date(state.checkIn);
    const d2 = new Date(state.checkOut);
    nights = Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
  }
  const subtotal = nights > 0 ? state.roomPrice * nights * state.rooms : 0;
  const totalAmount = subtotal + Number(state.additionalCharges || 0) - Number(state.discount || 0);


  const renderStepIndicator = () => {
    const steps = ["Guest Info", "Booking Details", "Pricing & Payment", "Confirm"];
    return (
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-4 left-0 w-full h-[1px] bg-mist -z-10" />
        <motion.div
          className="absolute top-4 left-0 h-[1px] bg-gold -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${((state.step - 1) / 3) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = state.step === stepNum;
          const isPast = state.step > stepNum;
          return (
            <div key={stepNum} className="flex flex-col items-center gap-4 bg-obsidian px-2 z-10 w-[80px]">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-obsidian
                ${isPast ? 'bg-gold text-void' :
                  isActive ? 'border-2 border-gold text-gold relative' :
                    'border border-mist text-fog'}`}
              >
                {isActive && (
                  <motion.div layoutId="stepHighlight" className="absolute inset-0 rounded-full border border-gold" />
                )}
                {isPast ? <Check className="w-4 h-4" /> : <span className="font-dmSans text-[14px]">{stepNum}</span>}
              </div>
              <span className={`font-jost text-[8px] uppercase tracking-[0.1em] transition-colors whitespace-nowrap text-center
                ${isActive || isPast ? 'text-gold' : 'text-fog'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };



  if (state.isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-obsidian border border-[rgba(184,150,90,0.12)] border-t-[2px] border-t-gold px-12 py-24 rounded-sm flex flex-col items-center text-center max-md:px-6"
      >
        <div className="w-20 h-20 mb-8 rounded-full border border-gold flex items-center justify-center">
          <motion.svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-gold"
            initial={{ strokeDashoffset: 48 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="48"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </div>

        <h2 className="font-cormorant text-4xl text-ivory mb-4">Reservation Saved!</h2>
        <p className="font-dmSans text-[15px] text-smoke max-w-sm mb-6 leading-relaxed">
          The booking details have been recorded for <span className="text-cream">{state.email}</span>.
        </p>

        <p className="font-jost text-[11px] text-fog mb-12 uppercase tracking-widest">
          Booking Ref: ALK-2025-{Math.floor(1000 + Math.random() * 9000)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gold text-void font-jost text-[11px] uppercase tracking-[0.15em] hover:bg-gold-light transition-colors"
          >
            Create Another Booking
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-obsidian border border-[rgba(184,150,90,0.12)] border-t-[2px] border-t-gold p-[56px_48px] rounded-[2px] max-md:p-8">
      {renderStepIndicator()}

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-10"
            >
              <div>
                <span className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8 block">
                  01 — Guest Info
                </span>

                <div className="grid grid-cols-1 gap-8 pt-4">
                  <div className="relative pt-4">
                    <label className={getLabelClass('guestName', state.guestName)}>Full Name*</label>
                    <input type="text" value={state.guestName} onChange={(e) => setVal('guestName', e.target.value)} onFocus={() => handleFocus('guestName')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('email', state.email)}>Email Address*</label>
                    <input type="email" value={state.email} onChange={(e) => setVal('email', e.target.value)} onFocus={() => handleFocus('email')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('phone', state.phone)}>Phone Number*</label>
                    <input type="tel" value={state.phone} onChange={(e) => setVal('phone', e.target.value)} onFocus={() => handleFocus('phone')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('address', state.address)}>Address*</label>
                    <input type="text" value={state.address} onChange={(e) => setVal('address', e.target.value)} onFocus={() => handleFocus('address')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('idNumber', state.idNumber)}>ID / Passport Number*</label>
                    <input type="text" value={state.idNumber} onChange={(e) => setVal('idNumber', e.target.value)} onFocus={() => handleFocus('idNumber')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative flex flex-col pt-2">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Number of Guests*</label>
                    <div className="relative">
                      <select value={state.numberOfGuests} onChange={(e) => setVal('numberOfGuests', Number(e.target.value))} className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 ${state.numberOfGuests > 0 ? 'text-cream' : 'text-fog'}`}>
                        <option value={0} disabled hidden>Select number of guests</option>
                        {[...Array(20)].map((_, i) => <option key={i + 1} value={i + 1} className="bg-charcoal text-cream">{i + 1}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={!isStep1Valid}
                onClick={handleNext}
                className={`w-full py-5 font-jost text-[12px] uppercase tracking-[0.15em] bg-gold text-void mt-4 transition-all duration-300
                  ${!isStep1Valid ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gold-light'}`}
              >
                Next Step →
              </button>
            </motion.div>
          )}

          {state.step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-10"
            >
              <div>
                <span className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8 block">
                  02 — Booking Details
                </span>

                <div className="relative flex flex-col mt-4 mb-8">
                  <label className="font-dmSans text-[12px] text-fog mb-2">Select Room*</label>
                  <div className="relative">
                    <select
                      value={state.roomType ? roomOptions.find(o => o.name === state.roomType)?.id : ""}
                      onChange={(e) => {
                        const opt = roomOptions.find(o => o.id === e.target.value);
                        if (opt) {
                          setState(p => ({ ...p, roomType: opt.name, roomPrice: opt.price }));
                        }
                      }}
                      className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 ${state.roomType ? 'text-cream' : 'text-fog'}`}
                    >
                      <option value="" disabled hidden>Select Room</option>
                      {roomOptions.map(opt => (
                        <option key={opt.id} value={opt.id} className="bg-charcoal text-cream">
                          {opt.name} — From ${opt.price}/night
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Check-in Date*</label>
                    <div className="relative">
                      <input type="date" value={state.checkIn} onChange={(e) => setVal('checkIn', e.target.value)} className={`${inputClass} !py-2 pr-10 ${state.checkIn ? 'text-cream' : 'text-fog'} [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer`} />
                      <CalendarDays className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Check-out Date*</label>
                    <div className="relative">
                      <input type="date" value={state.checkOut} onChange={(e) => setVal('checkOut', e.target.value)} min={state.checkIn} className={`${inputClass} !py-2 pr-10 ${state.checkOut ? 'text-cream' : 'text-fog'} [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer`} />
                      <CalendarDays className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Number of Rooms*</label>
                    <div className="relative">
                      <select value={state.rooms} onChange={(e) => setVal('rooms', Number(e.target.value))} className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 text-cream`}>
                        {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1} className="bg-charcoal text-cream">{i + 1}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Number of Nights</label>
                    <div className={`${inputClass} !py-2 text-gold`}>
                      {nights > 0 ? `${nights} nights` : '—'}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex gap-4">
                <button onClick={handlePrev} className="w-1/3 py-5 border border-gold text-gold font-jost text-[12px] uppercase tracking-[0.15em] hover:bg-gold hover:text-void transition-colors">
                  ← Back
                </button>
                <button disabled={!isStep2Valid} onClick={handleNext} className={`w-2/3 py-5 font-jost text-[12px] uppercase tracking-[0.15em] bg-gold text-void transition-all duration-300 ${!isStep2Valid ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gold-light'}`}>
                  Next Step →
                </button>
              </div>
            </motion.div>
          )}

          {state.step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-10"
            >
              <div>
                <span className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8 block">
                  03 — Pricing & Payment
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="relative">
                    <label className="font-dmSans text-[12px] text-fog mb-2 block">Room Rate (per night)</label>
                    <div className={`${inputClass} !py-2 text-cream bg-[rgba(255,255,255,0.02)] px-3 rounded-sm`}>
                      ${state.roomPrice || 0}
                    </div>
                  </div>

                  <div className="relative">
                    <label className={getLabelClass('additionalCharges', String(state.additionalCharges))}>Additional Charges ($)</label>
                    <input type="number" min="0" value={state.additionalCharges} onChange={(e) => setVal('additionalCharges', Number(e.target.value))} onFocus={() => handleFocus('additionalCharges')} onBlur={handleBlur} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="relative">
                    <label className={getLabelClass('discount', String(state.discount))}>Discount ($)</label>
                    <input type="number" min="0" value={state.discount} onChange={(e) => setVal('discount', Number(e.target.value))} onFocus={() => handleFocus('discount')} onBlur={handleBlur} className={inputClass} />
                  </div>

                  <div className="relative">
                    <label className="font-dmSans text-[12px] text-fog mb-2 block">Total Amount</label>
                    <div className={`${inputClass} !py-2 text-gold bg-[rgba(212,175,55,0.05)] px-3 rounded-sm font-medium`}>
                      ${totalAmount}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative">
                    <label className={getLabelClass('amountPaid', String(state.amountPaid))}>Amount Paid ($)</label>
                    <input type="number" min="0" value={state.amountPaid} onChange={(e) => setVal('amountPaid', Number(e.target.value))} onFocus={() => handleFocus('amountPaid')} onBlur={handleBlur} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mb-8">
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Payment Method*</label>
                    <div className="relative">
                      <select value={state.paymentMethod} onChange={(e) => setVal('paymentMethod', e.target.value)} className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 text-cream`}>
                        <option value="pending" className="bg-charcoal text-cream">Pending</option>
                        <option value="cash" className="bg-charcoal text-cream">Cash</option>
                        <option value="credit_card" className="bg-charcoal text-cream">Credit Card</option>
                        <option value="debit_card" className="bg-charcoal text-cream">Debit Card</option>
                        <option value="bank_transfer" className="bg-charcoal text-cream">Bank Transfer</option>
                        <option value="online_payment" className="bg-charcoal text-cream">Online Payment</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Payment Status*</label>
                    <div className="relative">
                      <select value={state.paymentStatus} onChange={(e) => setVal('paymentStatus', e.target.value)} className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 text-cream`}>
                        <option value="pending" className="bg-charcoal text-cream">Pending</option>
                        <option value="partial" className="bg-charcoal text-cream">Partial</option>
                        <option value="paid" className="bg-charcoal text-cream">Paid in Full</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Booking Source*</label>
                    <div className="relative">
                      <select value={state.bookingSource} onChange={(e) => setVal('bookingSource', e.target.value)} className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 text-cream`}>
                        <option value="Walk-In" className="bg-charcoal text-cream">Walk-In</option>
                        <option value="Phone" className="bg-charcoal text-cream">Phone</option>
                        <option value="Email" className="bg-charcoal text-cream">Email</option>
                        <option value="WhatsApp" className="bg-charcoal text-cream">WhatsApp</option>
                        <option value="Travel Agent" className="bg-charcoal text-cream">Travel Agent</option>
                        <option value="Corporate" className="bg-charcoal text-cream">Corporate</option>
                        <option value="Other" className="bg-charcoal text-cream">Other</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex gap-4">
                <button onClick={handlePrev} className="w-1/3 py-5 border border-gold text-gold font-jost text-[12px] uppercase tracking-[0.15em] hover:bg-gold hover:text-void transition-colors">
                  ← Back
                </button>
                <button disabled={!isStep3Valid} onClick={handleNext} className={`w-2/3 py-5 font-jost text-[12px] uppercase tracking-[0.15em] bg-gold text-void transition-all duration-300 ${!isStep3Valid ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gold-light'}`}>
                  Next Step →
                </button>
              </div>
            </motion.div>
          )}

          {state.step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-10"
            >
              <div>
                <span className="font-jost text-[10px] text-gold uppercase tracking-[0.2em] mb-8 block">
                  04 — Additional Information
                </span>

                <div className="relative mb-8">
                  <label className="font-dmSans text-[12px] text-fog mb-2 block">Special Requests</label>
                  <textarea
                    rows={4}
                    value={state.requests}
                    onChange={(e) => setVal('requests', e.target.value)}
                    placeholder="Any specific instructions, dietary restrictions, arrival times..."
                    className={`${inputClass} resize-none mb-0 text-[14px]`}
                  />
                </div>

                <div className="border border-[rgba(184,150,90,0.2)] bg-[rgba(184,150,90,0.04)] p-6 mb-10 space-y-3">
                  {[
                    "Confirm all details reflect the final arrangement",
                    "A notification will not be sent automatically from this test interface",
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <Check className="w-4 h-4 text-gold shrink-0" strokeWidth={2} />
                      <span className="font-dmSans text-[13px] text-smoke">{text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleConfirm}
                  className="w-full h-[64px] bg-gold text-void font-cormorant italic text-2xl hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <span className="not-italic text-lg">✦</span> Confirm Reservation
                </motion.button>

                <button
                  onClick={handlePrev}
                  className="w-full mt-6 text-fog font-dmSans text-[13px] hover:text-gold transition-colors block text-center"
                >
                  ← Back to Pricing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingForm;
