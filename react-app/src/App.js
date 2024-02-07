import React from 'react';
import WeekView from './WeeklyView'; // Make sure the path is correct based on your file structure
import './App.css'; // This is assuming you have some global styles you want to apply

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weekly Calendar</h1>
            </header>
            <main>
                <WeekView />
            </main>
        </div>
    );
};

export default App;
