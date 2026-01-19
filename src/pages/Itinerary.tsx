import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { trips } from '../data/trips'

function Itinerary() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState('<p>Loading...</p>')

  // Find the trip data
  const trip = trips.find((t) => t.slug === slug)

  useEffect(() => {
    // If trip doesn't exist, redirect to home
    if (!trip) {
      navigate('/')
      return
    }

    // Fetch the markdown file
    fetch(`/itineraries/${slug}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load itinerary')
        }
        return response.text()
      })
      .then(async (markdown) => {
        const parsed = await marked.parse(markdown)
        setContent(parsed)
      })
      .catch(() => {
        setContent('<p>Error loading itinerary. Please try again.</p>')
      })
  }, [slug, trip, navigate])

  // Update document title
  useEffect(() => {
    if (trip) {
      document.title = `${trip.title} - Travel Itineraries`
    }
    return () => {
      document.title = 'Travel Itineraries'
    }
  }, [trip])

  // Handle external links - open in new tab
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
    if (link && link.href) {
      const currentHost = window.location.hostname
      try {
        const linkHost = new URL(link.href).hostname
        const isExternal = linkHost !== currentHost
        const isAnchor = link.getAttribute('href')?.startsWith('#')

        if (isExternal && !isAnchor) {
          e.preventDefault()
          window.open(link.href, '_blank', 'noopener,noreferrer')
        }
      } catch {
        // Invalid URL, let default behavior handle it
      }
    }
  }

  if (!trip) {
    return null
  }

  return (
    <div className="itinerary-page">
      <div className="container">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <div
          className="itinerary-content"
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={handleContentClick}
        />
      </div>
    </div>
  )
}

export default Itinerary
