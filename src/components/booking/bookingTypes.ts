export type BookingState = {
  // 1- guets info
  guestName: string;
  email: string;
  phone: string;
  address: string;
  idNumber: string;
  numberOfGuests: number;

  // 2 - booking details
  roomType: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  roomPrice: number;

  // 3 - pricing payment
  additionalCharges: number;
  discount: number;
  amountPaid: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingSource: string;

  // 4 - additional info
  requests: string;

  step: number;
  isSubmitted: boolean;
};
