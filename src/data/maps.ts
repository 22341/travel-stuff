// Custom Google maps - add new maps here
// Maps are listed on the /maps page under their group heading, in the order below
// Each map opens in a new tab

export interface TripMap {
  title: string;
  url: string;
}

export interface MapGroup {
  heading: string;
  maps: TripMap[];
}

export const mapGroups: MapGroup[] = [
  {
    heading: "Ljubljana",
    maps: [
      {
        title: "Manchester",
        url: "https://www.google.com/maps/d/edit?mid=1aPXyf8315CLIM7HSZtbcjXY7Vtc&usp=sharing",
      },
      {
        title: "Ljubljana",
        url: "https://www.google.com/maps/d/edit?mid=1LYIMX_B-P3A4moJraHFrAQb1QHfsKyc&usp=sharing",
      },
    ],
  },
];
