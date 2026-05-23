import { createContext, useContext, useState, useCallback } from 'react';
import BookingModal from '../components/BookingModal.jsx';

const BookingContext = createContext({ open: false, openBooking: () => {}, closeBooking: () => {} });

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);
  return (
    <BookingContext.Provider value={{ open, openBooking, closeBooking }}>
      {children}
      <BookingModal open={open} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
