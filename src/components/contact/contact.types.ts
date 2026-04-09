
import type { ReactNode } from 'react';

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InfoRow {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  href?: string;
}

export const ANIMATION_DURATION = 0.5;
export const STICKY_TOP = 100;

export const FORM_INITIAL_STATE: FormData = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacyAccepted: false,
};

export const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Room Reservation',
  'Spa Booking',
  'Group/Event',
  'Feedback',
  'Other',
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  { question: 'What are your check-in and check-out times?', answer: 'Check-in begins at 12:00 PM and check-out is at 10:00 AM. Early check-in and late check-out can be arranged based on availability with prior notice.' },
  { question: 'Is breakfast included with the room rate?', answer: 'Yes, a curated mountain breakfast is included with most room categories. Inclusions are shown at booking and can vary for seasonal promotions.' },
  { question: 'Do you provide airport transfer services?', answer: 'Private transfers can be arranged from Bandaranaike International Airport and major cities. Share your flight details and we will coordinate your journey.' },
  { question: 'Is the resort suitable for children?', answer: 'Families are welcome. We recommend sharing your children\'s ages in advance so our team can prepare suitable bedding and dining arrangements.' },
  { question: 'Which payment methods do you accept?', answer: 'We accept major credit and debit cards, bank transfers, and selected digital payments. Payment terms are shared during reservation confirmation.' },
  { question: 'Is WiFi available throughout the property?', answer: 'Complimentary high-speed WiFi is available in suites and common areas. Network performance may vary slightly due to mountain weather conditions.' },
  { question: 'Can you arrange anniversary or honeymoon setups?', answer: 'Absolutely. We offer floral styling, private dining touches, and personalized room arrangements. Let us know your preferences at least 48 hours in advance.' },
  { question: 'How do I book spa treatments?', answer: 'Spa sessions can be reserved during booking, via WhatsApp, or at reception. Advance reservations are recommended for sunset and weekend slots.' },
  { question: 'Do you provide dietary options at the restaurant?', answer: 'Yes, our chefs accommodate vegetarian, vegan, gluten-conscious, and allergy-aware requests. Please mention requirements before arrival for the best experience.' },
  { question: 'What nearby attractions and activities are available?', answer: 'Guests enjoy tea estate walks, scenic viewpoints, waterfall visits, and guided sunrise trails. Our concierge can curate itineraries based on your stay duration.' },
];
