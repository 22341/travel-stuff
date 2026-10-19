import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapIcon } from "lucide-react";
import { mapGroups } from "../data/maps";

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
          {mapGroups.map((group) => (
            <section className="maps-group" key={group.heading}>
              <h2 className="maps-group__heading">{group.heading}</h2>
              <div className="maps-group__links">
                {group.maps.map((map) => (
                  <a
                    href={map.url}
                    className="maps-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={map.title}
                  >
                    <MapIcon className="maps-link__icon" aria-hidden="true" />{" "}
                    {map.title}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Maps;
