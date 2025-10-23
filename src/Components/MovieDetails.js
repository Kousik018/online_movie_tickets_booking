import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../BookingContext";
import { Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { update } = useBooking();
  const navigate = useNavigate();

  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:30");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!movie) return <p>Movie not found.</p>;

  const handleProceed = () => {
    update({ movie, date, time, seats: [], totalPrice: 0 });
    navigate(`/book/${id}`);
  };

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card>
          <Card.Img src={movie.poster_path ? IMG_BASE + movie.poster_path : "https://via.placeholder.com/500x750"} />
        </Card>
      </Col>
      <Col md={8}>
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
        <p>{movie.overview}</p>

        <Card className="p-3 mt-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Showtime</Form.Label>
              <Form.Select value={time} onChange={(e) => setTime(e.target.value)}>
                <option>10:00</option>
                <option>13:00</option>
                <option>16:30</option>
                <option>19:30</option>
                <option>22:00</option>
              </Form.Select>
            </Form.Group>
            <Button onClick={handleProceed}>Proceed to Seat Selection</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
