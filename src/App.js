import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./Components/Navbar";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import SeatSelection from "./Components/SeatSelection";
import Summary from "./Components/Summary";
import Confirmation from "./Components/Confirmation";
import { BookingProvider } from "./BookingContext";
import HomePage from "./Components/HomePage";
import MyBookings from "./Components/MyBookings";

import Signup from "./Components/Signup";

export default function App() {
  return (
    <BookingProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Fallback route */}
          <Route path="*" element={<Confirmation />} />
           <Route path="/confirmation" element={<Confirmation />} />
           <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </Container>
    </BookingProvider>
  );
}
