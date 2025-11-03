// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNav, Container, Nav, Button } from "react-bootstrap";
import cinestream from "../Images/cinestream.jpg";

export default function Navbar() {
  const [logged, setLogged] = useState(false); // Default to false
  const navigate = useNavigate();

  // Update login state whenever the component mounts or localStorage changes
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogged(true); // If user data exists, they are logged in
    }

    // Listen for changes to localStorage and update the login state accordingly
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setLogged(!!updatedUser); // Set logged state based on whether user exists in localStorage
    };

    window.addEventListener("storage", handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup on component unmount
    };
  }, []); // Only run once on component mount

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setLogged(false); // Update logged state immediately
    navigate("/login"); // Redirect to login page
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

            {/* Show Login and Sign Up only if not logged in */}
            {!logged ? (
              <>
                <Button as={Link} to="/signup" variant="primary" className="ms-2 px-2">
                  Sign Up
                </Button>
                <Button as={Link} to="/login" variant="primary" className="ms-2 px-3 py-2">
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
