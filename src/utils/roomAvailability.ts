import { ref, get } from "firebase/database";
import { database } from "../config/firebaseConfig";

export const SUITE_CAPACITY = {
  sunrise: 10,
  sunset: 6,
  garden: 6,
};

export const datesOverlap = (
  checkIn1: string, checkOut1: string,
  checkIn2: string, checkOut2: string
) => {
  const ci1 = new Date(checkIn1), co1 = new Date(checkOut1);
  const ci2 = new Date(checkIn2), co2 = new Date(checkOut2);
  return ci1 < co2 && co1 > ci2;
};

// Returns how many rooms of a suite are already booked for given dates
export const getBookedCount = async (
  suiteId: string,
  checkIn: string,
  checkOut: string,
  excludeBookingKey?: string
): Promise<number> => {
  const snapshot = await get(ref(database, "bookings"));
  if (!snapshot.exists()) return 0;

  const bookings = snapshot.val();
  let count = 0;

  for (const [key, booking] of Object.entries(bookings) as [string, any][]) {
    if (booking.status === "Cancelled") continue;
    if (excludeBookingKey && key === excludeBookingKey) continue;
    if (booking.roomId !== suiteId) continue;
    if (datesOverlap(checkIn, checkOut, booking.checkInDate, booking.checkOutDate)) {
      count++;
    }
  }

  return count;
};

// Returns available room count for a suite on given dates
export const getAvailableCount = async (
  suiteId: string,
  checkIn: string,
  checkOut: string,
  excludeBookingKey?: string
): Promise<number> => {
  const booked = await getBookedCount(suiteId, checkIn, checkOut, excludeBookingKey);
  return Math.max(0, (SUITE_CAPACITY[suiteId] || 0) - booked);
};