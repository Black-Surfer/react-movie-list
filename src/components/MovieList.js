import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({ movies, handleMovieItemClick }) => {
  return (
    <div className="grid gap-5 md:gap-10 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          handleOnMovieItemClick={handleMovieItemClick}
        />
      ))}
    </div>
  );
};

export default MovieList;
