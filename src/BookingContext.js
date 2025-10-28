import React, { createContext, useContext, useState, useEffect } from "react";
const BookingContext = createContext();

export function BookingProvider({ children }) {
  const storedBooking = localStorage.getItem("cine_booking");
  const storedHistory = localStorage.getItem("cine_booking_history");

  const [booking, setBooking] = useState(
    storedBooking
      ? JSON.parse(storedBooking)
      : {
          movie: null,
          date: null,
          time: null,
          seats: [],
          totalPrice: 0,
          user: null,
        }
  );

  const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : []);

  useEffect(() => {
    localStorage.setItem("cine_booking", JSON.stringify(booking));
  }, [booking]);

  useEffect(() => {
    localStorage.setItem("cine_booking_history", JSON.stringify(history));
  }, [history]);

  const update = (patch) => setBooking((b) => ({ ...b, ...patch }));

  const reset = () => {
    const empty = {
      movie: null,
      date: null,
      time: null,
      seats: [],
      totalPrice: 0,
      user: null,
    };
    setBooking(empty);
    localStorage.removeItem("cine_booking");
  };

  // Add completed booking to history
  const addToHistory = (newBooking) => {
    setHistory((prev) => [...prev, newBooking]);
  };

  return (
    <BookingContext.Provider value={{ booking, update, reset, addToHistory, history }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
