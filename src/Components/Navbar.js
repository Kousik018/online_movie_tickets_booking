import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BsNav, Container, Nav } from "react-bootstrap";

export default function Navbar() {
  return (
    <BsNav bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNav.Brand as={Link} to="/">🎬 CineStream</BsNav.Brand>
        <BsNav.Toggle aria-controls="nav" />
        <BsNav.Collapse id="nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
          </Nav>
        </BsNav.Collapse>
      </Container>
    </BsNav>
  );
}
