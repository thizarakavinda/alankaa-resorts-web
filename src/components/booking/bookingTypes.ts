export type BookingState = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomType: string;
  roomPrice: number;
  guestName: string;
  email: string;
  phone: string;
  country: string;
  requests: string;
  step: number; 
  isSubmitted: boolean;
};
