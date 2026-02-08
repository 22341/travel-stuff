import { Link } from "react-router-dom";
import { trips } from "../data/trips";

function Home() {
  const tripsByYear = trips.reduce(
    (acc, trip) => {
      acc[trip.year] = acc[trip.year] ?? [];
      acc[trip.year].push(trip);
      return acc;
    },
    {} as Record<number, typeof trips>,
  );

  const sortedYears = Object.keys(tripsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="home-page">
      <div className="container">
        <div className="home-heading">
          <h1>✈️ Travel Itineraries</h1>
          <p className="subtitle">
            Choose a destination to view the full itinerary
          </p>
        </div>

        {sortedYears.map((year) => (
          <div key={year}>
            <h2 className="year-heading">{year}</h2>
            <div className="trip-grid">
              {tripsByYear[year].map((trip) => (
                <Link
                  to={`/${trip.slug}`}
                  className="trip-card"
                  key={trip.slug}
                >
                  <h2>{trip.title}</h2>
                  <div className="arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
