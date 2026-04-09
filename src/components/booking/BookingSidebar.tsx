import type { BookingState } from './bookingTypes';
import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const BookingSidebar = ({ state }: { state: BookingState }) => {
  let nights = 0;
  if (state.checkIn && state.checkOut) {
    const d1 = new Date(state.checkIn);
    const d2 = new Date(state.checkOut);
    nights = Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
  }

  const estimatedTotal = nights > 0 && state.roomPrice ? state.roomPrice * nights * state.rooms : null;

  return (
    <div className="bg-charcoal border border-[rgba(184,150,90,0.15)] rounded-[2px] overflow-hidden flex flex-col">
      <div className="h-[200px] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2600&auto=format&fit=crop')" }} />

      <div className="p-8">
        <h3 className="font-jost text-[9px] text-gold uppercase tracking-[0.3em] mb-4">
          Your Booking Summary
        </h3>
        <div className="w-[30px] h-[1px] bg-gold mb-6" />

        <div className="space-y-4 mb-8">
          <SummaryRow label="Check-in Date" value={state.checkIn || '—'} />
          <SummaryRow label="Check-out Date" value={state.checkOut || '—'} />
          <SummaryRow label="Nights" value={nights > 0 ? nights.toString() : '—'} />
          <SummaryRow label="Room Type" value={state.roomType ? state.roomType.replace(/🛏|🌿|🏔|♾|🌅|🏡 /, '') : '—'} />
          <SummaryRow label="Guests" value={`${state.adults} Adults${state.children ? `, ${state.children} Children` : ''}`} />
          <SummaryRow label="Rooms" value={state.rooms.toString()} />
        </div>

        <div className="h-[1px] w-full bg-mist mb-6" />

        <div className="mb-8">
          <span className="font-jost text-[10px] text-fog uppercase tracking-widest block mb-2">Estimated Cost</span>
          <div className="font-cormorant text-4xl text-gold mb-1">
            {estimatedTotal ? `$${estimatedTotal}` : (state.roomPrice ? `$${state.roomPrice} / night` : '—')}
          </div>
          <span className="font-dmSans text-[11px] text-fog">* Confirmed by our team minimum 24h prior</span>
        </div>

        <div className="h-[1px] w-full bg-mist mb-8" />

        <div>
          <span className="font-jost text-[9px] text-fog uppercase tracking-widest block mb-4">Need Help Choosing?</span>
          <a
            href="https://wa.me/94707975975"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.3)] text-[#25D366] font-dmSans text-[13px] flex items-center justify-center gap-2 mb-6 hover:bg-[rgba(37,211,102,0.2)] transition-colors"
          >
            <FaWhatsapp size={16} /> Chat on WhatsApp
          </a>

          <div className="space-y-4">
            <a href="tel:+94707975975" className="font-dmSans text-[12px] text-smoke flex items-center gap-3 hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-[#d94f87]" strokeWidth={2} /> +94 70 797 5975
            </a>
            <a href="mailto:info@alankaaresorts.com" className="font-dmSans text-[12px] text-smoke flex items-center gap-3 hover:text-gold transition-colors">
              <Mail className="w-4 h-4 text-[#e8e4fb]" strokeWidth={2} /> info@alankaaresorts.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="font-dmSans text-[12px] text-fog">{label}</span>
    <span className="font-dmSans text-[14px] text-cream text-right">{value}</span>
  </div>
);

export default BookingSidebar;
