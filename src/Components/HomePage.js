import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
   
export default function HomePage() {
  return (
    
    <div className= " container-fluid mt-2  bg-black text-white w-100 justify-center" style={{ overflowX: "hidden" }}>
      {/* Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center text-center text-white"
        style={{
          height: "100vh",
          
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ maxWidth: "700px", padding: "0 20px" }}>
          <h1 className="display-3 fw-bold mb-4">Book Your Favorite Movies Instantly</h1>
          <p className="lead mb-4">
            Discover the latest releases, select your seats, and enjoy the big screen!
          </p>
          <Link to="/movies">
            <Button size="lg" variant="danger">
              Book Tickets Now
            </Button>
          </Link>
        </div>
      </div>



      {/* Features Section */}
      <Container fluid className="py-5 bg-dark">
        <Row className="text-center g-4 px-5">
          <Col md={4}>
            <Card className="bg-transparent border-light text-white h-100">
              <Card.Body>
                <Card.Title className="fs-3 mb-3">🎟 Easy Booking</Card.Title>
                <Card.Text>
                  Choose your movie, showtime, and seats — all in just a few clicks!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-transparent border-light text-white h-100">
              <Card.Body>
                <Card.Title className="fs-3 mb-3">🍿 Latest Releases</Card.Title>
                <Card.Text>
                  Stay up to date with trending blockbusters and upcoming movies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-transparent border-light text-white h-100">
              <Card.Body>
                <Card.Title className="fs-3 mb-3">💺 Seat Selection</Card.Title>
                <Card.Text>
                  View cinema layouts, select your favorite seats, and confirm instantly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <Container fluid className="py-5 bg-light text-dark">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">
              Ready to book your next movie?
            </h2>
            <p className="lead mb-4">
              Browse movies, select showtimes, and grab your seats before they’re gone.
            </p>
            <Link to="/movies">
              <Button variant="danger" size="lg">
                Browse Movies
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Container fluid className="bg-dark py-4 text-center text-muted">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} CineStream — Your Trusted Movie Booking Partner.
        </p>
        <p>
          <Link to="/" className="text-white text-decoration-none me-3">
            Home
          </Link>
          <Link to="/movies" className="text-white text-decoration-none me-3">
            Movies
          </Link>
          <Link to="/my-bookings" className="text-white text-decoration-none">
            My Bookings
          </Link>
        </p>
      </Container>
    </div>
  );
}
