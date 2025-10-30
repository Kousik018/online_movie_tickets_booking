import React, { useState } from "react";
import { useBooking } from "../BookingContext";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";

export default function Summary() {
  const { booking, update } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();
    const user = { name, email };
    update({ user });
    navigate("/confirmation");
  };

  if (!booking.movie) return <p>No booking in progress.</p>;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: "90vh", // slightly less height than full screen
        backgroundColor: "#f8f9fa",
        paddingTop: "40px", // smaller top padding
        paddingBottom: "20px",
      }}
    >
      <Card className="p-4 shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
        <h3 className="text-center mb-3">Payment & Confirmation</h3>

        <Form onSubmit={handlePay}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Card (simulated)</Form.Label>
            <Form.Control placeholder="1111 2222 3333 4444" required />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary">
              Pay ₹{booking.totalPrice}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
