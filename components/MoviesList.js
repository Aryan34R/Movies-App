import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesRequest } from "../redux/slices/MoviesSlice";

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Movies List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
