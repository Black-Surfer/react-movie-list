import React, { useState } from "react";

const AddMovieForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      onAdd({ title });
      setTitle("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white py-2 px-5 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Add New
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add a New Movie</h2>
            <form onSubmit={handleAdd} className="flex flex-col space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded-lg"
                placeholder="Movie Title"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 p-2 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMovieForm;
