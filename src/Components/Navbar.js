import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNav, Container, Nav, Button } from "react-bootstrap";
import cinestream from "../Images/cinestream.jpg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state when Navbar mounts or when localStorage changes
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLogin();

    // Listen for localStorage changes (even across tabs or routes)
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
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

            {/* Conditional rendering */}
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
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </BsNav.Collapse>
      </Container>
    </BsNav>
  );
}


