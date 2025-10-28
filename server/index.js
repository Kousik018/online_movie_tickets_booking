const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const dataPath = path.join(__dirname, 'data', 'movies.json');

let movies = [];
try {
  movies = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error('Failed to load movies data:', err);
}

// Simple in-memory bookings store
const bookings = [];

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movies.find(m => m.id === id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const { movieId, seats, name, email } = req.body;
  if (!movieId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ error: 'movieId and seats (non-empty array) required' });
  }

  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(400).json({ error: 'Invalid movieId' });

  // gather already booked seats for this movie
  const bookedSeats = bookings
    .filter(b => b.movieId === movieId)
    .flatMap(b => b.seats);

  const conflict = seats.some(s => bookedSeats.includes(s));
  if (conflict) return res.status(409).json({ error: 'One or more seats already booked' });

  const booking = {
    id: bookings.length + 1,
    movieId,
    seats,
    name: name || null,
    email: email || null,
    createdAt: new Date().toISOString()
  };
  bookings.push(booking);

  res.status(201).json(booking);
});

app.get('/api/availability/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  const bookedSeats = bookings
    .filter(b => b.movieId === movieId)
    .flatMap(b => b.seats);

  const allSeats = Array.from({ length: movie.totalSeats }, (_, i) => i + 1);
  const available = allSeats.filter(s => !bookedSeats.includes(s));

  res.json({ movieId, total: movie.totalSeats, availableCount: available.length, available });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
