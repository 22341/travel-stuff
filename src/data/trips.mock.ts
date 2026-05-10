import { Trip } from "./trips";

export const mockTrips: Trip[] = [
  {
    slug: "test-trip-future",
    title: "Future Trip",
    year: 2099,
    startDate: "2099-06-01",
    tags: ["Rail", "Test", "5 days"],
    description: "A future test trip",
    accentColor: "#ff0000",
  },
  {
    slug: "test-trip-no-date",
    title: "No Date Trip",
    year: 2099,
    tags: ["Test"],
    description: "A test trip with no start date",
    accentColor: "#00ff00",
  },
  {
    slug: "test-trip-past",
    title: "Past Trip",
    year: 2020,
    startDate: "2020-01-01",
    tags: ["Test"],
    description: "A past test trip",
    accentColor: "#0000ff",
  },
];
