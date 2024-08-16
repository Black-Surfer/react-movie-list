import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL || "https://www.omdbapi.com";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const getMovies = (page) => {
  return axios.get(API_URL, {
    params: {
      s: "movie",
      type: "movie",
      apikey: API_KEY,
      page,
    },
  });
};

const searchMovies = (query, page) => {
  return axios.get(API_URL, {
    params: {
      s: query,
      page,
      apikey: API_KEY,
    },
  });
};

const getMovieDetails = (id) => {
  return axios.get(API_URL, {
    params: {
      i: id,
      apikey: API_KEY,
    },
  });
};

export default { getMovies, searchMovies, getMovieDetails };
