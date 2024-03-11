import React, { useEffect, useState } from "react";

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
        <div className="DevelopersStatsPage">
            <h2>Developers Statistics</h2>
            {developers.length > 0 ? (
                <ul>
                    {developers.map((dev) => (
                        <li key={dev._id}>
                            {dev.Fname} {dev.Lname}: {dev.stats ? JSON.stringify(dev.stats) : "No stats available"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No developers found.</p>
            )}
            <Link to="/dashboard" className="back-to-dashboard" style={{ textDecoration: "none" }}> {/* Update this link to match your routes */}
                Back to Dashboard
            </Link>
        </div>
    );
};

export default DevelopersStatsPage;
