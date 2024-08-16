import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "../services/movieService";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = query
        ? await movieService.searchMovies(query, page)
        : await movieService.getMovies(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addMovie: (state, action) => {
      state.movies.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalPages = action.payload.totalResults;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, addMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
