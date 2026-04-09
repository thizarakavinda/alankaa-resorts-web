import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agree: false
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const isFilled = (value: string) => value.trim().length > 0;

  const getLabelClass = (field: string) => {
    const active = focusedField === field || isFilled(formData[field as keyof typeof formData] as string);
    return `absolute left-0 transition-all duration-300 pointer-events-none ${active
      ? '-top-[8px] text-[11px] font-jost uppercase tracking-[0.1em] text-gold'
      : 'top-[16px] text-[14px] font-dmSans text-fog'
      }`;
  };

  const inputClass = "w-full bg-transparent border-none border-b border-mist py-4 font-dmSans text-[15px] text-cream outline-none focus:border-gold transition-colors duration-300";

  return (
    <div className="w-full">
      <h2 className="font-cormorant text-[40px] text-ivory mb-6">Send Us a Message</h2>
      <div className="w-[40px] h-[1px] bg-gold mb-12"></div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            {/* r1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-4">
                <label className={getLabelClass('name')}>Full Name*</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={inputClass}
                />
              </div>
              <div className="relative pt-4">
                <label className={getLabelClass('email')}>Email*</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={inputClass}
                />
              </div>
            </div>

            {/* r2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-4">
                <label className={getLabelClass('phone')}>Phone (WhatsApp)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                  className={inputClass}
                />
              </div>
              <div className="relative pt-4">
                <label className={getLabelClass('subject')}>Subject</label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer ${isFilled(formData.subject) ? 'text-cream' : 'text-fog'}`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                >
                  <option value="" disabled hidden></option>
                  <option value="general" className="bg-obsidian text-cream">General Inquiry</option>
                  <option value="room" className="bg-obsidian text-cream">Room Reservation</option>
                  <option value="spa" className="bg-obsidian text-cream">Spa Booking</option>
                  <option value="event" className="bg-obsidian text-cream">Group / Event</option>
                  <option value="feedback" className="bg-obsidian text-cream">Feedback</option>
                  <option value="other" className="bg-obsidian text-cream">Other</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 text-gold pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* r3 */}
            <div className="relative mt-4 pt-4">
              <label className={getLabelClass('message')}>Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* r4 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-4 h-4 border border-mist group-hover:border-gold transition-colors flex items-center justify-center">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                  {formData.agree && <div className="w-2 h-2 bg-gold" />}
                </div>
                <span className="font-dmSans text-[12px] text-smoke">I agree to privacy policy</span>
              </label>

              <button
                type="submit"
                className="w-full sm:w-auto font-jost text-[12px] uppercase tracking-[0.15em] bg-gold text-void py-4 px-12 hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Send Message <span className="text-[14px]">→</span>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 bg-charcoal/30 border border-mist/20 rounded-sm"
          >
            <div className="w-20 h-20 mb-6 rounded-full border border-gold flex items-center justify-center">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-gold"
                initial={{ strokeDashoffset: 48 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
            <h3 className="font-cormorant text-2xl text-cream mb-2">Message Received</h3>
            <p className="font-dmSans text-smoke">We'll be in touch within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
