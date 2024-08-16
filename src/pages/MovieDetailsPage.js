import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieService from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {movie && (
        <>
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.description}</p>
          <div className="text-gray-600">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
