import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../BookingContext";
import { createSeatMap, seatMaps } from "../data";
import { Button, Row, Col, Card } from "react-bootstrap";

/*
 Seat grid UI:
 - seatMaps stored in data.seatMaps keyed by `${movieId}_${date}_${time}`
 - seat object: { id: 'A1', booked: bool }
*/

function keyFor(movieId, date, time) {
  return `${movieId}_${date}_${time}`;
}

export default function SeatSelection() {
  const { id } = useParams();
  const { booking, update } = useBooking();
  const navigate = useNavigate();

  const movie = booking.movie;
  const date = booking.date;
  const time = booking.time;
  const price = movie ? movie.price : 0;

  // if user landed here without selection, redirect to movie page
  useEffect(() => {
    if (!movie || movie.id !== id || !date || !time) {
      navigate(`/movies/${id}`);
    }
  }, [movie, id, date, time, navigate]);

  const mapKey = keyFor(id, date, time);
  if (!seatMaps[mapKey]) {
    seatMaps[mapKey] = createSeatMap(7, 10); // 7 rows (A-G), 10 cols
  }

  const [seatMap, setSeatMap] = useState(seatMaps[mapKey]);
  const [selected, setSelected] = useState(booking.seats || []);

  useEffect(() => {
    // ensure selected seats reflect booking context
    setSelected(booking.seats || []);
  }, [booking.seats]);

  const toggleSeat = (r, c) => {
    const seat = seatMap[r][c];
    if (seat.booked) return; // cannot toggle booked
    const id = seat.id;
    const exists = selected.includes(id);
    const next = exists ? selected.filter((s) => s !== id) : [...selected, id];
    setSelected(next);
    update({ seats: next, totalPrice: next.length * price });
  };

  const handleConfirm = () => {
    // mark selected as booked in seatMap (simulate finalization)
    const newMap = seatMap.map((row) =>
      row.map((s) => (selected.includes(s.id) ? { ...s, booked: true } : s))
    );
    seatMaps[mapKey] = newMap;
    setSeatMap(newMap);
    update({ totalPrice: selected.length * price });
    navigate("/summary");
  };

  if (!movie) return null;

  return (
    <Row className="mt-4">
      <Col md={8}>
        <Card className="p-3">
          <h4>Select Seats</h4>
          <p className="text-muted">Click seats to select. Booked seats are disabled.</p>

          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "inline-block", border: "1px solid #eee", padding: 12 }}>
              {seatMap.map((row, r) => (
                <div key={r} style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
                  <div style={{ width: 24, marginRight: 8 }}>{String.fromCharCode(65 + r)}</div>
                  <div style={{ display: "flex" }}>
                    {row.map((seat, c) => {
                      let cls = "btn btn-sm me-1";
                      if (seat.booked) cls += " btn-secondary disabled"; // booked
                      else if (selected.includes(seat.id)) cls += " btn-success"; // selected
                      else cls += " btn-outline-primary"; // available

                      return (
                        <button
                          key={seat.id}
                          className={cls}
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
            <div className="mb-2">
              <strong>Selected Seats:</strong> {selected.length ? selected.join(", ") : "None"}
            </div>
            <div className="mb-3">
              <strong>Total:</strong> ₹{selected.length * price}
            </div>

            <Button variant="success" onClick={handleConfirm} disabled={selected.length === 0}>
              Proceed to Payment
            </Button>
          </div>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="p-3">
          <h5>Booking Summary</h5>
          <p><strong>Movie:</strong> {movie.title}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Seats:</strong> {selected.join(", ") || "None"}</p>
          <p><strong>Price / seat:</strong> ₹{price}</p>
          <h5>Payable: ₹{selected.length * price}</h5>
        </Card>
      </Col>
    </Row>
  );
}
