import React from "react";
import { useBooking } from "../BookingContext";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function MyBookings() {
  const { history } = useBooking();

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🎟️ My Bookings</h2>
      {history.length === 0 ? (
        <p className="text-center text-muted">You have no previous bookings yet.</p>
      ) : (
        <Row className="g-3">
          {history.map((b, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{b.movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {b.date} • {b.time}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Seats:</strong> {b.seats.join(", ")} <br />
                    <strong>Paid:</strong> ₹{b.totalPrice} <br />
                    <strong>Name:</strong> {b.user?.name || "Guest"} <br />
                    <strong>Email:</strong> {b.user?.email || "—"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
