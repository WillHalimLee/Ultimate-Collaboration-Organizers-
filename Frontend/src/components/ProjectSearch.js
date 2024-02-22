import React from "react";
import "./css/ProjectSearch.css";

const ProjectSearch = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="project-search-container">
      <input
        type="text"
        placeholder="Search Active Projects"
        value={searchTerm}
        onChange={onSearchChange}
        className="project-search-input"
      />
      <button onClick={() => onSearchSubmit(searchTerm)} className="project-search-button">
        Search
      </button>
    </div>
  );
};

export default ProjectSearch;
