import React from "react";

const SearchBar = ({ setSearchInput, searchInput }) => {
  return (
    <div className="controller__searchBar">
      <input
        className="controller__input"
        type="text"
        name=""
        value={searchInput}
        placeholder={`Search people or messages...`}
        onClick={() => {
          setSearchInput((old) => (old ? old : ""));
        }}
        onInput={(e) => {
          setSearchInput(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
