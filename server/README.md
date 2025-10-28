# Simple local API for online_movie_tickets_booking

This lightweight Express API is intended to be used during development alongside the React app.

Quick start

1. Open a terminal in this folder (`server`).
2. Install dependencies: `npm install`.
3. Start the server: `npm start`.

Endpoints

- GET /api/movies - list sample movies
- GET /api/movies/:id - movie details
- GET /api/bookings - list bookings (in-memory)
- POST /api/bookings - create a booking (body: { movieId, seats: [1,2], name, email })
- GET /api/availability/:movieId - available seats for a movie

Notes

- Bookings are stored in memory and reset when the server restarts. For persistence, integrate a DB (SQLite/Postgres) or write bookings to a file.
