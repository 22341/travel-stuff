import { Link } from "react-router-dom";
import { trips, Trip } from "../data/trips";
import { useMemo } from "react";
import { Globe2 } from "lucide-react";

function daysUntil(isoDate?: string): number | null {
  if (!isoDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  return diff > 0 ? diff : null;
}

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
          <h1>
            <Globe2 className="heading-icon" strokeWidth={1.5} /> Travel
            Itineraries
          </h1>
        </header>

        {sortedYears.map((year, i) => (
          <section key={year}>
            <h2
              className={`year-heading ${i === 0 ? "year-heading--first" : ""}`}
            >
              {year}
            </h2>
            <div className="trip-list">
              {tripsByYear[year].map((trip) => {
                const days = daysUntil(trip.startDate);
                return (
                  <Link
                    to={`/${trip.slug}`}
                    className="trip-row"
                    key={trip.slug}
                    aria-label={`View itinerary for ${trip.title}`}
                  >
                    <div
                      className="trip-row__accent"
                      style={{ backgroundColor: trip.accentColor ?? "#888" }}
                    />
                    <div className="trip-row__body">
                      {trip.tags && trip.tags.length > 0 && (
                        <div className="trip-row__chips">
                          {trip.tags.map((tag) => (
                            <span className="chip" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="trip-row__title">{trip.title}</p>
                      {trip.description && (
                        <p className="trip-row__description">
                          {trip.description}
                        </p>
                      )}
                    </div>
                    <div className="trip-row__right">
                      {days !== null ? (
                        <>
                          <span
                            className="trip-row__countdown"
                            style={{ color: trip.accentColor ?? "#888" }}
                          >
                            {days}
                          </span>
                          <span className="trip-row__countdown-label">
                            days away
                          </span>
                        </>
                      ) : (
                        <span className="trip-row__arrow">→</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Home;
