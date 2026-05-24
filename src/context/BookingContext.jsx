import { createContext, useContext, useState, useCallback } from 'react';
import BookingModal from '../components/BookingModal.jsx';

const BookingContext = createContext({
  open: false,
  bookingContext: null,
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState(null);
  const openBooking = useCallback((context = null) => {
    const nextContext = context && !context.nativeEvent && !context.target ? context : null;
    setBookingContext(nextContext);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);
  return (
    <BookingContext.Provider value={{ open, bookingContext, openBooking, closeBooking }}>
      {children}
      <BookingModal open={open} onClose={closeBooking} context={bookingContext} />
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
