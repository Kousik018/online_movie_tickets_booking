// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNav, Container, Nav, Button } from "react-bootstrap";
import cinestream from "../Images/cinestream.jpg";
import { isLoggedIn, logout, subscribe } from "../utils/auth";

export default function Navbar() {
  const [logged, setLogged] = useState(isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    // subscribe returns an unsubscribe function
    const unsubscribe = subscribe((newState) => {
      setLogged(Boolean(newState));
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
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

            {!logged ? (
              <>
                <Button as={Link} to="/signup" variant="primary" className="ms-2 p-2">
                  Sign Up
                </Button>
                <Button as={Link} to="/login" variant="primary" className="ms-2 p-3">
                  Login
                </Button>
              </>
            ) : (
              <Button variant="danger" className="ms-2" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </BsNav.Collapse>
      </Container>
    </BsNav>
  );
}



