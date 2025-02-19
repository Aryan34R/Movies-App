import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesRequest } from "../redux/slices/MoviesSlice";
import { Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";

const Dashboard = () => {
  const key = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  
  const { movies } = useSelector((state) => state.movies);
  const userMovies = movies.filter((movie) => movie.userid === key.id);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  // const [editingMovieId, setEditingMovieId] = useState(null);
  // const [editTitle, setEditTitle] = useState("");
  // const [editYear, setEditYear] = useState("");

  useEffect(() => {
    dispatch(fetchMoviesRequest()); 
  }, [dispatch]);

  const addMovie = async (e) => {
    e.preventDefault();
    if (!title || !year || !poster) {
      alert("Please fill all fields");
      return;
    }

    const newMovie = {
      id: movies.length > 0 ? (Math.max(...movies.map(m => Number(m.id))) + 1).toString() : "1",
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

    dispatch(fetchMoviesRequest()); 
    setTitle("");
    setYear("");
    setPoster("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/movies/${id}`, { method: "DELETE" });

    dispatch(fetchMoviesRequest()); 
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
            <TextField label="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField label="Release Year" value={year} onChange={(e) => setYear(e.target.value)} fullWidth />
            <TextField label="Movie Poster Link" value={poster} onChange={(e) => setPoster(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" onClick={addMovie}>Add Movie</Button>
          </div>
        </div>
      </div>

      <div style={styles.moviesGrid}>
        {userMovies.map((movie) => (
          <Card key={movie.id} style={styles.movieCard}>
            <Avatar src={movie.poster} alt="Movie Poster" style={styles.avatar} />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">Year: {movie.year}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(movie.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: "#f3f3f3", minHeight: "100vh", padding: "20px" },
  dashboard: { display: "flex", justifyContent: "center" },
  userInfo: { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", maxWidth: "400px", width: "100%" },
  inputContainer: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" },
  moviesGrid: { display: "grid", gap: "16px", padding: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" },
  movieCard: { display: "flex", alignItems: "center", padding: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" },
  avatar: { width: "56px", height: "56px", marginRight: "16px", borderRadius: "8px" },
};

export default Dashboard;
