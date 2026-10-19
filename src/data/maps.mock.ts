import { MapGroup } from "./maps";

export const mockMapGroups: MapGroup[] = [
  {
    heading: "Test Country",
    maps: [
      {
        title: "Test City",
        url: "https://www.google.com/maps/d/viewer?mid=test-city",
      },
      {
        title: "Another Place",
        url: "https://www.google.com/maps/d/viewer?mid=another-place",
      },
      {
        title: "Future Place",
        url: "",
      },
    ],
  },
  {
    heading: "Second Group",
    maps: [
      {
        title: "Lone Map",
        url: "https://www.google.com/maps/d/viewer?mid=lone-map",
      },
    ],
  },
];
