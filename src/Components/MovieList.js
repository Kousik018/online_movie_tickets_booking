import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { movies } from "../data";

export default function MovieList() {  
  return (
    <>
      <h2 className="mt-4">Now Showing</h2>
      <Row>
        {movies.map((m) => (
          <Col md={4} key={m.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div style={{height: "360px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Card.Img variant="top" src={m.poster} style={{maxHeight: "360px", objectFit: "cover"}} />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{m.title}</Card.Title>
                <Card.Text style={{flexGrow: 1, fontSize: 14}}>{m.synopsis}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div><strong>₹{m.price}</strong></div>
                  <Button as={Link} to={`/movies/${m.id}`} variant="primary">View / Book</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
