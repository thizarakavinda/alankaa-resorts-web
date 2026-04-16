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
    const active = focusedField === field || val.trim().length > 0;
    return `absolute left-0 transition-all duration-300 pointer-events-none ${active
        ? '-top-[8px] text-[11px] font-jost uppercase tracking-[0.1em] text-gold'
        : 'top-[16px] text-[14px] font-dmSans text-fog'
      }`;
  };

  const isStep1Valid = state.checkIn && state.checkOut && state.roomType;
  const isStep2Valid = state.guestName && state.email;



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
  const renderStepIndicator = () => {
    const steps = ["Stay Details", "Guest Info", "Confirm"];
    return (
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-4 left-0 w-full h-[1px] bg-mist -z-10" />
        <motion.div
          className="absolute top-4 left-0 h-[1px] bg-gold -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${((state.step - 1) / 2) * 100}%` }}
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
              <span className={`font-jost text-[9px] uppercase tracking-[0.1em] transition-colors whitespace-nowrap
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

        <h2 className="font-cormorant text-4xl text-ivory mb-4">Reservation Request Sent!</h2>
        <p className="font-dmSans text-[15px] text-smoke max-w-sm mb-6 leading-relaxed">
          We'll reach out to <span className="text-cream">{state.email}</span> within 24 hours to confirm your stay.
        </p>

        <p className="font-jost text-[11px] text-fog mb-12 uppercase tracking-widest">
          Booking Ref: ALK-2025-{Math.floor(1000 + Math.random() * 9000)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="https://wa.me/94707975975"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] text-white font-jost text-[11px] uppercase tracking-[0.15em] hover:bg-[#20bd5a] transition-colors"
          >
            Add to WhatsApp
          </a>
          <a
            href="/"
            className="px-8 py-4 border border-gold text-gold font-jost text-[11px] uppercase tracking-[0.15em] hover:bg-gold hover:text-void transition-colors"
          >
            Return to Home
          </a>
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
                  01 — Stay Details
                </span>

                {/* r1*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Check-in Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={state.checkIn}
                        onChange={(e) => setVal('checkIn', e.target.value)}
                        className={`${inputClass} !py-2 pr-10 ${state.checkIn && state.checkOut ? 'text-gold' : 'text-cream'} [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer`}
                      />
                      <CalendarDays className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Check-out Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={state.checkOut}
                        onChange={(e) => setVal('checkOut', e.target.value)}
                        min={state.checkIn}
                        className={`${inputClass} !py-2 pr-10 ${state.checkIn && state.checkOut ? 'text-gold' : 'text-cream'} [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer`}
                      />
                      <CalendarDays className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* r2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Adults</label>
                    <div className="relative">
                      <select
                        value={state.adults}
                        onChange={(e) => setVal('adults', Number(e.target.value))}
                        className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10`}
                      >
                        {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1} className="bg-charcoal text-cream">{i + 1}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Children</label>
                    <div className="relative">
                      <select
                        value={state.children}
                        onChange={(e) => setVal('children', Number(e.target.value))}
                        className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10`}
                      >
                        {[...Array(7)].map((_, i) => <option key={i} value={i} className="bg-charcoal text-cream">{i}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative flex flex-col">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Rooms</label>
                    <div className="relative">
                      <select
                        value={state.rooms}
                        onChange={(e) => setVal('rooms', Number(e.target.value))}
                        className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10`}
                      >
                        {[...Array(5)].map((_, i) => <option key={i + 1} value={i + 1} className="bg-charcoal text-cream">{i + 1}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* r3*/}
                <div className="relative flex flex-col mt-4">
                  <label className="font-dmSans text-[12px] text-fog mb-2">Room Type</label>
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
                      <option value="" disabled hidden>Select Suite</option>
                      {roomOptions.map(opt => (
                        <option key={opt.id} value={opt.id} className="bg-charcoal text-cream">
                          {opt.name} — From ${opt.price}/night
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
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
                  02 — Guest Details
                </span>

                <div className="grid grid-cols-1 gap-8 pt-4">
                  <div className="relative pt-4">
                    <label className={getLabelClass('guestName', state.guestName)}>Full Name*</label>
                    <input
                      type="text"
                      value={state.guestName}
                      onChange={(e) => setVal('guestName', e.target.value)}
                      onFocus={() => handleFocus('guestName')}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('email', state.email)}>Email Address*</label>
                    <input
                      type="email"
                      value={state.email}
                      onChange={(e) => setVal('email', e.target.value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative pt-4">
                    <label className={getLabelClass('phone', state.phone)}>Phone (WhatsApp preferred)</label>
                    <input
                      type="tel"
                      value={state.phone}
                      onChange={(e) => setVal('phone', e.target.value)}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative flex flex-col pt-2">
                    <label className="font-dmSans text-[12px] text-fog mb-2">Country / Nationality</label>
                    <div className="relative">
                      <select
                        value={state.country}
                        onChange={(e) => setVal('country', e.target.value)}
                        className={`${inputClass} !py-2 appearance-none cursor-pointer pr-10 ${state.country ? 'text-cream' : 'text-fog'}`}
                      >
                        <option value="" disabled hidden>Select Country</option>
                        <option value="us" className="bg-charcoal text-cream">🇺🇸 United States</option>
                        <option value="uk" className="bg-charcoal text-cream">🇬🇧 United Kingdom</option>
                        <option value="sl" className="bg-charcoal text-cream">🇱🇰 Sri Lanka</option>
                        <option value="au" className="bg-charcoal text-cream">🇦🇺 Australia</option>
                        <option value="eu" className="bg-charcoal text-cream">🇪🇺 Europe (Other)</option>
                        <option value="other" className="bg-charcoal text-cream">🌍 Other</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="font-dmSans text-[12px] text-fog mb-2 block">Special Requests</label>
                    <textarea
                      rows={4}
                      value={state.requests}
                      onChange={(e) => setVal('requests', e.target.value)}
                      placeholder="Anniversary candles, dietary needs, early check-in, spa booking..."
                      className={`${inputClass} resize-none mb-0 text-[14px]`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="w-1/3 py-5 border border-gold text-gold font-jost text-[12px] uppercase tracking-[0.15em] hover:bg-gold hover:text-void transition-colors"
                >
                  ← Back
                </button>
                <button
                  disabled={!isStep2Valid}
                  onClick={handleNext}
                  className={`w-2/3 py-5 font-jost text-[12px] uppercase tracking-[0.15em] bg-gold text-void transition-all duration-300
                    ${!isStep2Valid ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gold-light'}`}
                >
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
                  03 — Review & Confirm
                </span>

                <div className="space-y-4 mb-8">
                  <ReviewRow label="Check-in" value={state.checkIn || 'Not Selected'} />
                  <ReviewRow label="Check-out" value={state.checkOut || 'Not Selected'} />
                  <ReviewRow label="Room Type" value={state.roomType || 'Not Selected'} />
                  <ReviewRow label="Guests" value={`${state.adults} Adults${state.children ? `, ${state.children} Children` : ""}`} />
                  <ReviewRow label="Guest Name" value={state.guestName} />
                  <ReviewRow label="Email" value={state.email} />
                  {state.requests && <ReviewRow label="Requests" value={state.requests} />}
                </div>

                <div className="h-[1px] w-full bg-mist mb-8" />

                <div className="mb-8">
                  {state.checkIn && state.checkOut && state.roomPrice ? (
                    (() => {
                      const d1 = new Date(state.checkIn);
                      const d2 = new Date(state.checkOut);
                      const nights = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
                      const total = state.roomPrice * nights * state.rooms;
                      return (
                        <>
                          <div className="font-cormorant text-2xl text-gold mb-1">
                            ${state.roomPrice} × {nights} {nights === 1 ? 'night' : 'nights'} × {state.rooms} {state.rooms === 1 ? 'room' : 'rooms'} = ${total} total
                          </div>
                          <div className="font-dmSans text-[11px] text-fog mt-2">* Final price confirmed via email</div>
                        </>
                      );
                    })()
                  ) : (
                    <div className="font-cormorant text-2xl text-cream mb-1">Price awaiting dates.</div>
                  )}
                </div>

                <div className="border border-[rgba(184,150,90,0.2)] bg-[rgba(184,150,90,0.04)] p-6 mb-10 space-y-3">
                  {[
                    "No payment required at this stage",
                    "Our team contacts you within 24 hours",
                    "Free cancellation available",
                    "100% secure & confidential"
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
                  ← Back to Guest Info
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ReviewRow = ({ label, value }: { label: string, value: string }) => (
  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-start gap-4">
    <span className="font-dmSans text-[13px] text-fog">{label}:</span>
    <span className="font-dmSans text-[14px] text-cream">{value}</span>
  </div>
);

export default BookingForm;
