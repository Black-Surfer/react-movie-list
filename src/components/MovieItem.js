import React from "react";

const MovieItem = ({ movie, handleOnMovieItemClick }) => {
  return (
    <div className="h-full rounded-lg relative bg-black overflow-hidden  ">
      <img
        src={movie.Poster}
        className="w-full h-full object-cover object-top"
        alt=""
      />

      <button
        onClick={() => handleOnMovieItemClick(movie.imdbID)}
        className="bg-[#d9dbe9] cursor-pointer text-black text-xs font-medium px-8 py-3 rounded-[24px] absolute bottom-5 left-[50%] outline-none border-none -translate-x-[50%]"
      >
        View
      </button>
    </div>
  );
};

export default MovieItem;
