import { Link } from "react-router-dom";
import { trips, Trip } from "../data/trips";
import { useMemo } from "react";

function Home() {
  const { tripsByYear, sortedYears } = useMemo(() => {
    const byYear = trips.reduce(
      (acc, trip) => {
        acc[trip.year] = acc[trip.year] ?? [];
        acc[trip.year].push(trip);
        return acc;
      },
      {} as Record<number, Trip[]>,
    );

    const years = Object.keys(byYear)
      .map(Number)
      .sort((a, b) => a - b);
    return { tripsByYear: byYear, sortedYears: years };
  }, []);

  return (
    <main className="home-page">
      <div className="container">
        <header className="home-heading">
          <h1>✈️ Travel Itineraries</h1>
          <p className="subtitle">
            Choose a destination to view the full itinerary
          </p>
        </header>

        {sortedYears.map((year) => (
          <section key={year}>
            <h2 className="year-heading">{year}</h2>
            <div className="trip-grid">
              {tripsByYear[year].map((trip) => (
                <Link
                  to={`/${trip.slug}`}
                  className="trip-card"
                  key={trip.slug}
                  aria-label={`View itinerary for ${trip.title}`}
                >
                  <h2>{trip.title}</h2>
                  <div className="arrow">→</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Home;
