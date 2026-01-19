import { Link } from 'react-router-dom'
import { trips } from '../data/trips'

function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-heading">
          <h1>✈️ Travel Itineraries</h1>
          <p className="subtitle">Choose a destination to view the full itinerary</p>
        </div>

        <div className="trip-grid">
          {trips.map((trip) => (
            <Link to={`/${trip.slug}`} className="trip-card" key={trip.slug}>
              <h2>{trip.title}</h2>
              <div className="arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
