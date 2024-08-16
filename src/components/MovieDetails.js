import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import movieService from "../services/movieService";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { query, page } = location.state || {};

  const handleBackClick = useCallback(() => {
    if (query) {
      navigate(`/?query=${query}&page=${page}`);
    } else {
      navigate("/");
    }
  }, [navigate, query, page]);

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
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white w-[95vw] max-w-[500px] p-7 mx-auto h-full overflow-y-auto">
      <button
        onClick={handleBackClick}
        class="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>

      <img
        src={movie.Poster}
        className="w-full block mt-10 rounded-xl"
        alt=""
      />

      <h3 className="font-bold text-xl mt-10">{movie.Title}</h3>

      <p className="py-5">{movie.Plot}</p>

      <button text="Watch" width="100%"></button>
    </div>
  );
};

export default MovieDetailsPage;
