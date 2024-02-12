import React from 'react';

const ProjectSearch = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search Active Projects"
                value={searchTerm}
                onChange={onSearchChange} // The handler is called every time the user types
            />
            <button onClick={onSearchSubmit}>Search</button>
        </div>
    );
};


export default ProjectSearch;