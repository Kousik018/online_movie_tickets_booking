import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      {/* Main Content */}
      <Container
        fluid
        className="mt-2 bg-black text-white w-100 d-flex flex-column justify-content-center no-x-scroll p-0 m-0"
      >
        {/* Hero Section */}
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center text-center text-white p-0 m-0"
          style={{
            height: "100vh",
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="px-3" style={{ maxWidth: "1200px" }}>
            <h1 className="display-3 fw-bold mb-4">
              Book Your Favorite Movies Instantly
            </h1>
            <p className="lead mb-4">
              Discover the latest releases, select your seats, and enjoy the big screen!
            </p>
            <Link to="/movies">
              <Button size="lg" variant="danger">
                Book Tickets Now
              </Button>
            </Link>
          </div>
        </Container>

        {/* Features Section */}
        <Container fluid className="py-5 bg-dark">
          <Row className="text-center g-4 px-5">
            {[
              {
                title: "🎟 Easy Booking",
                text: "Choose your movie, showtime, and seats — all in just a few clicks!",
              },
              {
                title: "🍿 Latest Releases",
                text: "Stay up to date with trending blockbusters and upcoming movies.",
              },
              {
                title: "💺 Seat Selection",
                text: "View cinema layouts, select your favorite seats, and confirm instantly.",
              },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="bg-transparent border-light text-white h-100">
                  <Card.Body>
                    <Card.Title className="fs-3 mb-3">{feature.title}</Card.Title>
                    <Card.Text>{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* CTA Section */}
        <Container fluid className="py-5 bg-light text-dark">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Ready to book your next movie?</h2>
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
      </Container>

      {/* Footer Section */}
      <Container fluid className="bg-dark text-white py-4 mt-0">
        <Row className="text-center">
          <Col>
            <p className="mb-1">
              © {new Date().getFullYear()} CineBook. All Rights Reserved.
            </p>
           
          </Col>
        </Row>
      </Container>
    </>
  );
}
