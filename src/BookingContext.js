import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    movie: null,
    date: null,
    time: null,
    seats: [], // array of seat ids
    totalPrice: 0,
    user: null
  });

  const update = (patch) => setBooking((b) => ({ ...b, ...patch }));

  const reset = () =>
    setBooking({
      movie: null,
      date: null,
      time: null,
      seats: [],
      totalPrice: 0,
      user: null
    });

  return (
    <BookingContext.Provider value={{ booking, update, reset }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
