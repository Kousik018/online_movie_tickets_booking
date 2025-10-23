
import { Card, Form, Button } from "react-bootstrap";
return(
<div className="col-md-6">
          <Card className="p-3">
            <h5>Booking Summary</h5>
            <p><strong>Movie:</strong> {booking.movie.title}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
            <h5>Total: ₹{booking.totalPrice}</h5>
          </Card>
        </div>
);