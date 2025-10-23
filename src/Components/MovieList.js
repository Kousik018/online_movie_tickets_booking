import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1";
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <h2 className="mt-4">Now Showing</h2>
      <Row>
        {movies.map((m) => (
          <Col md={4} key={m.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div style={{ height: "360px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={m.poster_path ? IMG_BASE + m.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{m.title}</Card.Title>
                <Card.Text style={{ flexGrow: 1, fontSize: 14 }}>
                  {m.overview?.slice(0, 120)}...
                </Card.Text>
                <Button as={Link} to={`/movies/${m.id}`} variant="primary">
                  View / Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
