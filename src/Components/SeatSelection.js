import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../BookingContext";
import { Button, Row, Col, Card } from "react-bootstrap";

/* === Helpers === */

// Generate a seat map (7 rows x 10 columns)
const createSeatMap = (rows = 7, cols = 10) => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        id: `${String.fromCharCode(65 + r)}${c + 1}`,
        booked: Math.random() < 0.05, // randomly mark some booked
      });
    }
    seats.push(row);
  }
  return seats;
};

// Store seat maps by movie/date/time in memory
const seatMaps = {};
const keyFor = (movieId, date, time) => `${movieId}_${date}_${time}`;

/* === Component === */
export default function SeatSelection() {
  const { id } = useParams();
  const { booking, update } = useBooking();
  const navigate = useNavigate();

  const movie = booking.movie;
  const date = booking.date;
  const time = booking.time;
  const price = 250; // fixed ticket price

  // Redirect if booking data is missing
  useEffect(() => {
    if (!movie || movie.id !== Number(id) || !date || !time) {
      navigate(`/movies/${id}`);
    }
  }, [movie, id, date, time, navigate]);

  const mapKey = keyFor(id, date, time);
  if (!seatMaps[mapKey]) seatMaps[mapKey] = createSeatMap();

  const [seatMap, setSeatMap] = useState(seatMaps[mapKey]);
  const [selected, setSelected] = useState([]);

  const toggleSeat = (r, c) => {
    const seat = seatMap[r][c];
    if (seat.booked) return;
    const seatId = seat.id;
    const updated = selected.includes(seatId)
      ? selected.filter((s) => s !== seatId)
      : [...selected, seatId];
    setSelected(updated);
    update({ seats: updated, totalPrice: updated.length * price });
  };

  const handleConfirm = () => {
    const updatedMap = seatMap.map((row) =>
      row.map((s) => (selected.includes(s.id) ? { ...s, booked: true } : s))
    );
    seatMaps[mapKey] = updatedMap;
    setSeatMap(updatedMap);
    navigate("/summary");
  };

  if (!movie) return null;

  return (
    <Row className="mt-4">
      {/* Poster Column */}
      <Col md={4} className="d-flex justify-content-center mb-3">
        {movie.poster_path && (
          <Card style={{ width: "100%", maxWidth: 250, textAlign: "center" }}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // API poster URL
              alt={movie.title}
              style={{ borderRadius: 8 }}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <strong>Date:</strong> {date} <br />
                <strong>Time:</strong> {time}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>

      {/* Seat Selection Column */}
      <Col md={8}>
        <Card className="p-3">
          <h4>Select Your Seats</h4>
          <div style={{ overflowX: "auto" }}>
            <div
              style={{
                display: "inline-block",
                border: "1px solid #eee",
                padding: 12,
              }}
            >
              {seatMap.map((row, r) => (
                <div
                  key={r}
                  style={{ marginBottom: 8, display: "flex", alignItems: "center" }}
                >
                  <div style={{ width: 24, marginRight: 8 }}>
                    {String.fromCharCode(65 + r)}
                  </div>
                  <div style={{ display: "flex" }}>
                    {row.map((seat, c) => {
                      let btnClass = "btn btn-sm me-1";
                      if (seat.booked) btnClass += " btn-secondary disabled";
                      else if (selected.includes(seat.id)) btnClass += " btn-success";
                      else btnClass += " btn-outline-primary";
                      return (
                        <button
                          key={seat.id}
                          className={btnClass}
                          style={{ width: 44, height: 36, padding: 0 }}
                          onClick={() => toggleSeat(r, c)}
                        >
                          {seat.id.replace(/^[A-Z]/, "")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p>
              <strong>Selected:</strong> {selected.join(", ") || "None"}
            </p>
            <p>
              <strong>Total:</strong> ₹{selected.length * price}
            </p>
            <Button variant="success" disabled={!selected.length} onClick={handleConfirm}>
              Proceed to Payment
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
