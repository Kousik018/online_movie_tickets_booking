import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BsNav, Container, Nav, Button } from "react-bootstrap";
import cinestream from "../Images/cinestream.jpg";

export default function Navbar() {
  // Example: Check if user is logged in (you can replace this with real auth logic)
  const isLoggedIn = localStorage.getItem("userToken"); // or sessionStorage / context

  return (
    <>
      <BsNav bg="dark" variant="dark" expand="lg">
        <Container>
          <BsNav.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={cinestream}
              alt="CineStream Logo"
              width="100"
              height="100"
              className="me-2 rounded-circle"
            />
          </BsNav.Brand>
          <BsNav.Toggle aria-controls="nav" />
          <BsNav.Collapse id="nav">
            <Nav className="ms-auto fs-5 align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>

              {/* Conditional Rendering */}
              {!isLoggedIn ? (
                <>
                  <Button as={Link} to="/signup" variant="primary" className="ms-2">
                    Sign Up
                  </Button>
                  <Button as={Link} to="/login" variant="primary" className="ms-2">
                    Login
                  </Button>
                </>
              ) : (
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    window.location.reload(); // refresh navbar after logout
                  }}
                >
                  Logout
                </Button>
              )}
            </Nav>
          </BsNav.Collapse>
        </Container>
      </BsNav>
    </>
  );
}

