import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { trips } from "../data/trips";

// Open external links in a new tab. DOMPurify hooks are global, so register once.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (
    node instanceof HTMLAnchorElement &&
    /^https?:$/.test(node.protocol) &&
    node.host !== window.location.host
  ) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

type ItineraryState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "loaded"; html: string };

function Itinerary() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<ItineraryState>({ status: "loading" });

  // Find the trip data
  const trip = trips.find((t) => t.slug === slug);

  useEffect(() => {
    // If trip doesn't exist, redirect to home
    if (!trip) {
      navigate("/");
      return;
    }

    const controller = new AbortController();

    async function loadItinerary() {
      try {
        const response = await fetch(`/itineraries/${slug}.md`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to load itinerary");
        }
        const markdown = await response.text();
        const sanitizedHtml = DOMPurify.sanitize(await marked.parse(markdown));
        setState({ status: "loaded", html: sanitizedHtml });
      } catch {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            message: "Error loading itinerary. Please try again.",
          });
        }
      }
    }

    loadItinerary();
    return () => controller.abort();
  }, [slug, trip, navigate]);

  // Update document title
  useEffect(() => {
    if (trip) {
      document.title = `${trip.title} - Travel Itineraries`;
    }
    return () => {
      document.title = "Travel Itineraries";
    };
  }, [trip]);

  // Route plain clicks on same-site links through the router (no page reload).
  // External links, modifier clicks and in-page anchors use browser defaults.
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const link = (e.target as HTMLElement).closest("a");
    if (!link || link.target || link.origin !== window.location.origin) return;
    if (link.pathname === window.location.pathname && link.hash) return;

    e.preventDefault();
    navigate(link.pathname + link.search + link.hash);
  };

  if (!trip) {
    return null;
  }

  return (
    <main className="itinerary-page">
      <div className="container">
        <nav>
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </nav>
        {state.status === "loading" && (
          <div className="itinerary-content">
            <p>Loading...</p>
          </div>
        )}
        {state.status === "error" && (
          <div className="itinerary-content">
            <p>{state.message}</p>
          </div>
        )}
        {state.status === "loaded" && (
          <div
            className="itinerary-content"
            dangerouslySetInnerHTML={{ __html: state.html }}
            onClick={handleContentClick}
          />
        )}
      </div>
    </main>
  );
}

export default Itinerary;
