import React, { useState } from "react";
import { useBooking } from "../BookingContext";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";

export default function Summary() {
  const { booking, update } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();
    // simulate payment success
    const user = { name, email };
    update({ user });
    // In a real app we'd call a payment API here. Simulate success then navigate
    navigate("/confirmation");
  };

  if (!booking.movie) return <p>No booking in progress.</p>;

  return (
    <div className="mt-4">
      <h3>Payment & Confirmation</h3>
      <div className="row">
        <div className="col-md-6">
          <Card className="p-3">
            <h5>Enter details (simulated payment)</h5>
            <Form onSubmit={handlePay}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} onChange={e => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Card (simulated)</Form.Label>
                <Form.Control placeholder="1111 2222 3333 4444" required />
              </Form.Group>

              <Button type="submit" variant="primary">Pay ₹{booking.totalPrice}</Button>
            </Form>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="p-3">
            <h5>Booking Summary</h5>
            <p><strong>Movie:</strong> {booking.movie.title}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
            <h5>Total: ₹{booking.totalPrice}</h5>
          </Card>
        </div>
      </div>
    </div>
  );
}
