
import React from 'react';
import './ProjectSearch.css';

const ProjectSearch = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    return (
        <div className="project-search-container">
            <input
                type="text"
                placeholder="Search Active Projects"
                value={searchTerm}
                onChange={onSearchChange} // The handler is called every time the user types
                className="project-search-input"
            />
            <button onClick={onSearchSubmit} className="project-search-button">
                Search
            </button>
        </div>
    );
};

export default ProjectSearch;