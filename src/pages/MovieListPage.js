import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMovies, setPage, addMovie } from "../store/movieSlice";
import SearchInput from "../components/SearchInput";
import AddMovieForm from "../components/AddMovieForm";
import Pagination from "../components/Pagination";
import MovieList from "../components/MovieList";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { movies, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      dispatch(fetchMovies({ query, page: currentPage }));
    } else {
      dispatch(fetchMovies({ page: currentPage }));
    }
  }, [dispatch, currentPage, location.search]);

  const handleSearch = useCallback(
    async (query) => {
      navigate(`/?query=${query}`);
      dispatch(fetchMovies({ query, page: currentPage }));
    },
    [dispatch, navigate, currentPage]
  );

  const handleMovieClick = useCallback(
    (movieId) => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("query");
      navigate(`/movie/${movieId}`, {
        state: { query: query, page: currentPage },
      });
    },
    [navigate, location.search, currentPage]
  );

  const handleAddMovie = useCallback(
    (newMovie) => {
      dispatch(addMovie(newMovie));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between gap-4 items-center mb-4">
        <SearchInput onSearch={handleSearch} />
        <AddMovieForm onAdd={handleAddMovie} />
      </div>
      <div>
        {movies.length > 0 ? (
          <MovieList movies={movies} handleMovieItemClick={handleMovieClick} />
        ) : (
          <div className="text-center col-span-full">No movies found</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieListPage;
