import React, { useEffect, useState } from "react";
import "./css/developerStatics.css";
import * as userService from "../services/userService";
import { Link } from "react-router-dom";

const DevelopersStatsPage = () => {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        const fetchDevelopersAndStats = async () => {
            try {
                const devs = await userService.getDevelopers();
                const devsStats = await Promise.all(
                    devs.map(async (dev) => {
                        const stats = await userService.getDeveloperStats(dev._id);
                        return { ...dev, stats };
                    })
                );
                setDevelopers(devsStats);
            } catch (error) {
                console.error("Failed to fetch developers and their statistics:", error);
            }
        };

        fetchDevelopersAndStats();
    }, []);

    return (
        <div className="DevelopersStatsWholePage">
        <div className="DevelopersStatsPage">
            <h1 className="login-title">UCO</h1>
            <h2 className="page-title">Developers Statistics</h2>
            {developers.length > 0 ? (
                <ul className="developers-list">
                    {developers.map((dev) => (
                        <li key={dev._id} className="developer-item">
                            <p className="developer-name">{dev.Fname} {dev.Lname}</p>
                            <p className="developer-id">Developer ID: {dev._id}</p>
                            <p className="developer-stats-title">Stats</p>
                            {dev.stats ? (
                                <ul className="developer-stats-list">
                                    <li className="stats-item">Pending: {dev.stats.stats.pending || 0}</li>
                                    <li className="stats-item">In Progress: {dev.stats.stats.inProgress || 0}</li>
                                    <li className="stats-item">Emergency: {dev.stats.stats.emergency || 0}</li>
                                    <li className="stats-item">Done: {dev.stats.stats.done || 0}</li>
                                </ul>
                            ) : (
                                <p className="no-stats-message">No stats available</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-developers-message">No developers found.</p>
            )}
          <Link to="/app" className="back-to-dashboard" style={{ textDecoration: "none" }}>
              &nbsp;
          </Link>
        </div>
        </div>
    );
};

export default DevelopersStatsPage;
