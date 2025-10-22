// Sample movie + showtime data (local)
const movies = [
  {
    id: "1",
    title: "Avengers: Endgame",
    synopsis: "Superheroes unite to reverse Thanos' snap.",
    cast: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    director: "Anthony & Joe Russo",
    genre: "Action, Sci-Fi",
    releaseDate: "2019-04-26",
    poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
    price: 250
  },
  {
    id: "2",
    title: "Inception",
    synopsis: "A thief enters dreams to steal secrets.",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
    director: "Christopher Nolan",
    genre: "Sci-Fi, Thriller",
    releaseDate: "2010-07-16",
    poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
    price: 200
  },
  {
    id: "3",
    title: "Interstellar",
    synopsis: "A journey through space and time to save humanity.",
    cast: "Matthew McConaughey, Anne Hathaway",
    director: "Christopher Nolan",
    genre: "Sci-Fi, Drama",
    releaseDate: "2014-11-07",
    poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    price: 220
  }
];

// For each movie, define showtimes (simple example)
const showtimes = {
  "1": {
    // keyed by date (YYYY-MM-DD) with list of times
    "2025-10-17": ["10:00", "13:30", "16:30", "19:30"],
    "2025-10-18": ["11:00", "14:30", "18:00"]
  },
  "2": {
    "2025-10-17": ["09:30", "12:30", "15:30", "20:00"],
    "2025-10-19": ["13:00", "16:00"]
  },
  "3": {
    "2025-10-17": ["10:15", "14:00", "19:00"],
    "2025-10-20": ["12:00", "18:30"]
  }
};

// Basic seat map template (n rows x cols)
function createSeatMap(rows = 7, cols = 10) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        id: `${String.fromCharCode(65 + r)}${c + 1}`,
        booked: Math.random() < 0.08 // random small fraction pre-booked
      });
    }
    seats.push(row);
  }
  return seats;
}

// seat maps per movie-showtime-date (simulated)
const seatMaps = {}; // will be lazily created in components

export { movies, showtimes, seatMaps, createSeatMap };
