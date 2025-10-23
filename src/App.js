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

function Home() {
  return (
    <div className="mt-4 text-center">
      <h1>Welcome to MovieBook</h1>
      <p className="lead">Browse movies, pick a showtime, choose seats, and book online.</p>
      <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Fallback route */}
          <Route path="*" element={<Summary/>}/>
        </Routes>
      </Container>
    </BookingProvider>
  );
}
