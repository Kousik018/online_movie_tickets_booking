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

  if (!booking.movie)
    return <p className="text-center mt-5">No booking in progress.</p>;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0c10 0%, #1f2833 100%)",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "10px",
          color: "#0b0c10",
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        }}
      >
        <h3
          className="text-center mb-3 fw-bold"
          style={{ color: "#007bff", letterSpacing: "1px" }}
        >
          Payment & Confirmation
        </h3>

        {/* Movie Summary Section */}
        <div className="mb-4 text-center">
          <p className="mb-1">
            <strong>Movie:</strong> {booking.movie?.title || "N/A"}
          </p>
          <p className="mb-1">
            <strong>Total:</strong> ₹{booking.totalPrice || 0}
          </p>
        </div>

        <Form onSubmit={handlePay}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-primary">Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="shadow-sm border-primary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-primary">Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              className="shadow-sm border-primary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-primary">
              Card (simulated)
            </Form.Label>
            <Form.Control
              placeholder="1111 2222 3333 4444"
              required
              className="shadow-sm border-primary-subtle"
            />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              className="w-100 mt-2 fw-semibold"
              size="lg"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 5px 15px rgba(0,123,255,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Pay ₹{booking.totalPrice}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
