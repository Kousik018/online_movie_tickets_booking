import React from "react";
import { useBooking } from "../BookingContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const { booking, reset } = useBooking();

  if (!booking.movie) return <p>No booking found.</p>;

  return (
    <div className="mt-4">
      <Card className="p-4 text-center">
        <h2 className="text-success">Booking Confirmed ✅</h2>
        <p>Thank you, {booking.user?.name || "Guest"} — your booking is confirmed.</p>
        <p><strong>Movie:</strong> {booking.movie.title}</p>
        <p><strong>Date & Time:</strong> {booking.date} {booking.time}</p>
        <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
        <p><strong>Amount Paid:</strong> ₹{booking.totalPrice}</p>

        <div className="mt-3 d-flex justify-content-center">
          <Button variant="primary" as={Link} to="/movies" onClick={reset}>Book More</Button>
        </div>
      </Card>
    </div>
  );
}
