import { useEffect } from "react";
import { Link } from "react-router-dom";
import { tripMaps } from "../data/maps";

function Maps() {
  // Update document title
  useEffect(() => {
    document.title = "Trip Maps - Travel Itineraries";
    return () => {
      document.title = "Travel Itineraries";
    };
  }, []);

  return (
    <main className="maps-page">
      <div className="container">
        <nav>
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </nav>
        <div className="maps-content">
          <h1>Trip Maps</h1>
          <ul className="maps-list">
            {tripMaps.map((map) => (
              <li key={map.title}>
                <a href={map.url} target="_blank" rel="noopener noreferrer">
                  {map.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Maps;
