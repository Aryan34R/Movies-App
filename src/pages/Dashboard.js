import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";

const Dashboard = () => {
  const key = JSON.parse(localStorage.getItem("currentUser"));

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editYear, setEditYear] = useState("");

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();
        const userMovies = data.filter((movie) => movie.userid === key.id);
        setMovies(userMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [key.id]);

  const addMovie = async (e) => {
    e.preventDefault();
    if (!title || !year || !poster) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/movies");
      const moviesData = await response.json();

      const existingMovie = moviesData.find((m) => m.title === title && m.userid === key.id);
      if (existingMovie) {
        alert("This movie is already in your list");
        return;
      }

      const newMovie = {
        id: moviesData.length > 0 ? (Math.max(...moviesData.map(m => Number(m.id))) + 1).toString() : "1",
        userid: key.id,
        title,
        year,
        poster,
        
      };

      await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      setMovies([...movies, newMovie]);
      setTitle("");
      setYear("");
      setPoster("");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setEditTitle(movie.title);
    setEditYear(movie.year);
  };
  
  const handleSaveEdit = async (id) => {
  try {
    const movieToUpdate = movies.find((movie) => movie.id === id);

    const updatedMovie = {
      id: movieToUpdate.id, 
      userid: movieToUpdate.userid, 
      title: editTitle,
      year: editYear,
      poster: movieToUpdate.poster, 
    };

    await fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });

    setMovies(movies.map((movie) => (movie.id === id ? updatedMovie : movie)));
    setEditingMovieId(null);
  } catch (error) {
    console.error("Error updating movie:", error);
  }
};

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, { method: "DELETE" });
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div style={styles.container}>

      <MenuAppBar />

      <div style={styles.dashboard}>
        <div style={styles.userInfo}>
          <h2>Movie Collection</h2>
          <p><strong>Email:</strong> {key.email}</p>
          <p><strong>Name:</strong> {key.firstName}</p>

          <div style={styles.inputContainer}>
            <TextField
              label="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Release Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
            />
            <TextField
              label="Movie Poster Link"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={addMovie}>
              Add Movie
            </Button>
          </div>

        </div>
      </div>

      <div style={styles.moviesGrid}>
        {movies.map((movie) => (
          <Card key={movie.id} style={styles.movieCard}>
            <Avatar src={movie.poster} alt="Movie Poster" style={styles.avatar} />
            <CardContent style={{ flexGrow: 1 }}>
              {editingMovieId === movie.id ? (
                <>
                  <TextField
                    label="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Year"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <Button variant="contained" color="primary" onClick={() => handleSaveEdit(movie.id)}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setEditingMovieId(null)} style={{ marginLeft: "10px" }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Year: {movie.year}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(movie)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(movie.id)} style={{ marginLeft: "10px" }}>
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#f3f3f3",
    minHeight: "100vh",
    padding: "20px",
  },
  dashboard: {
    display: "flex",
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  moviesGrid: {
    display: "grid",
    gap: "16px",
    padding: "16px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  movieCard: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "56px",
    height: "56px",
    marginRight: "16px",
    borderRadius: "8px",
  },
};

export default Dashboard;
