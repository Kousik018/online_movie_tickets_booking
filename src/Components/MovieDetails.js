import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, showtimes } from "../data";
import { useBooking } from "../BookingContext";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const navigate = useNavigate();
  const { update } = useBooking();

  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(Object.keys(showtimes[id] || {})?.[0] || today);
  const [time, setTime] = useState((showtimes[id] && showtimes[id][date] && showtimes[id][date][0]) || "");

  // whenever date changes, set default time if available
  React.useEffect(() => {
    if (showtimes[id] && showtimes[id][date]) {
      setTime(showtimes[id][date][0]);
    } else {
      setTime("");
    }
  }, [date, id]);

  if (!movie) return <p>Movie not found.</p>;

  const handleProceed = () => {
    update({ movie, date, time, seats: [], totalPrice: 0 });
    navigate(`/book/${id}`);
  };

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card className="shadow-sm">
          <Card.Img variant="top" src={movie.poster} />
        </Card>
      </Col>
      <Col md={8}>
        <h2>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre} &nbsp; <strong>Release:</strong> {movie.releaseDate}</p>
        <p>{movie.synopsis}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Director:</strong> {movie.director}</p>

        <Card className="p-3 mt-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Showtimes</Form.Label>
              <div>
                {(showtimes[id] && showtimes[id][date]) ? (
                  showtimes[id][date].map((t) => (
                    <Button
                      key={t}
                      variant={t === time ? "success" : "outline-primary"}
                      className="me-2 mb-2"
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </Button>
                  ))
                ) : (
                  <div className="text-muted">No showtimes available for selected date.</div>
                )}
              </div>
            </Form.Group>

            <div className="d-flex">
              <Button variant="primary" disabled={!time} onClick={handleProceed}>
                Proceed to Seat Selection
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
