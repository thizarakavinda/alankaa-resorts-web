import { useState } from 'react';
import BookingForm from './BookingForm';
import BookingSidebar from './BookingSidebar';
import type { BookingState } from './bookingTypes';

const BookingInterface = () => {
  const [state, setState] = useState<BookingState>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    roomType: '',
    roomPrice: 0,
    guestName: '',
    email: '',
    phone: '',
    country: '',
    requests: '',
    step: 1,
    isSubmitted: false
  });

  return (
    <section className="bg-void py-[80px] px-[80px] max-lg:px-12 max-md:py-16 max-md:px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-[60%_36%] gap-[4%] max-lg:grid-cols-1 max-lg:gap-12 items-start relative">
        {/* form */}
        <div className="w-full">
          <BookingForm state={state} setState={setState} />
        </div>

        {/* right sidebr */}
        <aside className="w-full relative lg:sticky lg:top-[100px]">
          <BookingSidebar state={state} />
        </aside>
      </div>
    </section>
  );
};

export default BookingInterface;
