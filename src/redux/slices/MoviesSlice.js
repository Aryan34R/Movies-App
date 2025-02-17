import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesRequest: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    },
    fetchMoviesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } =
  moviesSlice.actions;
export default moviesSlice.reducer;
