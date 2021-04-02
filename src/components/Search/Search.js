import React from "react";

const Search = () => {
  return (
    <div className="container">
      <form className="col-lg-6 my-5 mx-auto">
        <div className="input-group mb-3 p-4">
          <input
            type="text"
            className="form-control search-box"
            placeholder="Search for Item"
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-danger btn-style px-3 py-2"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
