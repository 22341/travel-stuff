// Custom Google maps - add new maps here
// Maps are listed on the /maps page under their group heading, in the order below
// Each map opens in a new tab; leave url as "" to show a 'coming soon' pill

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
  {
    heading: "Colin in Australia",
    maps: [
      {
        title: "London",
        url: "https://www.google.com/maps/d/edit?mid=1WW1xk-Wkepg_h1T7tqXrwiX5yTA3lQI&usp=sharing",
      },
      {
        title: "Singapore",
        url: "",
      },
      {
        title: "Sydney",
        url: "https://www.google.com/maps/d/viewer?mid=1PlwinaOc2o2fOTpsCDfpXywWQFcN8U0&ll=-33.87324530000001%2C151.20713289999998&z=17",
      },
      {
        title: "Brisbane",
        url: "",
      },
      {
        title: "Adelaide",
        url: "",
      },
      {
        title: "Melbourne",
        url: "",
      },
    ],
  },
  {
    heading: "Southeast Asia Phase 1 (Jon)",
    maps: [
      {
        title: "London",
        url: "https://www.google.com/maps/d/edit?mid=1WW1xk-Wkepg_h1T7tqXrwiX5yTA3lQI&usp=sharing",
      },
      {
        title: "Kuala Lumpur",
        url: "https://www.google.com/maps/d/edit?mid=1NRSq2mAoaq1jhtI4lGbVVEwuDpnYyPY&usp=sharing",
      },
      {
        title: "Phnom Penh",
        url: "https://www.google.com/maps/d/edit?mid=1Z-sqQguMlX4b26h3OX8okwjheHg207M&usp=sharing",
      },
      {
        title: "Chau Doc / Can Tho",
        url: "https://www.google.com/maps/d/edit?mid=1b5Sz8KnuXFavf9qn0iuFVtSMtyRmUgs&usp=sharing",
      },
      {
        title: "Ho Chi Minh",
        url: "https://www.google.com/maps/d/edit?mid=1Vk6fXlfCLtdBEFjyOmzsS8Q2_F1gwEc&usp=sharing",
      },
      {
        title: "Hoi An",
        url: "https://www.google.com/maps/d/edit?mid=15gAnWgwgPppfLZ6yVwYw7iIMT0KnG2M&usp=sharing",
      },
      {
        title: "Da Nang",
        url: "https://www.google.com/maps/d/edit?mid=1rrA6tBZxT4wPpPNAbF9bnTnHakZijrc&usp=sharing",
      },
      {
        title: "Hue",
        url: "https://www.google.com/maps/d/edit?mid=1S9T3Pt8i4Im590CMDqFASnIq62Mpuv4&usp=sharing",
      },
      {
        title: "Hanoi",
        url: "https://www.google.com/maps/d/edit?mid=184hLcIdpGccApxI3AShafMb51ri0JoI&usp=sharing",
      },
      {
        title: "Taipei",
        url: "https://www.google.com/maps/d/edit?mid=1Z--stv02vPSrbAVlBd7OrWxrr-LYFHw&usp=sharing",
      },
    ],
  },
  {
    heading: "Southeast Asia Phase 2",
    maps: [
      {
        title: "Manila",
        url: "https://www.google.com/maps/d/edit?mid=1E2ljzvT9iN24pAJOyE2mf0iBuiFxSZU&usp=sharing",
      },
      {
        title: "Cebu City",
        url: "https://www.google.com/maps/d/edit?mid=1CQ56Oc1vjxd3_zndeEhKjqt0560p9JE&usp=sharing",
      },
      {
        title: "Tokyo",
        url: "https://www.google.com/maps/d/edit?hl=en&mid=1XYNn1fROliNG1Cbq7SoCzTaL9qC4dV0&ll=35.66263057624851%2C139.6807598&z=12",
      },
      {
        title: "Okayama",
        url: "https://www.google.com/maps/d/edit?mid=1w9I7kPZLC5da2Teep0f2bfrtWn1k3a4&usp=sharing",
      },
      {
        title: "Fukuoka",
        url: "https://www.google.com/maps/d/edit?mid=1f0_xwSvhobx6F8AC3g85VAXZK4XmYPc&usp=sharing",
      },
      {
        title: "Himeji",
        url: "https://www.google.com/maps/d/edit?mid=1uxEbJ2wEmqoXF7LGO2qWi3UUkkple_k&usp=sharing",
      },
      {
        title: "Kobe",
        url: "https://www.google.com/maps/d/edit?mid=1XCkSGG3WlUBtU2DIhBkkWGW1gYoKDuE&usp=sharing",
      },
      {
        title: "Kanazawa",
        url: "https://www.google.com/maps/d/edit?mid=1CTt2TYTa6UbV6pfuDxR_IvrUepZ80Ec&usp=sharing",
      },
    ],
  },
  {
    heading: "Southeast Asia Phase 3 (Neil)",
    maps: [
      {
        title: "Hong Kong",
        url: "https://www.google.com/maps/d/edit?mid=1tF3-D320BpO_M19nqevL4nL_BoFC9w4&usp=sharing",
      },
      {
        title: "Guilin",
        url: "",
      },
      {
        title: "Chengdu",
        url: "",
      },
      {
        title: "Xi'an",
        url: "",
      },
      {
        title: "Beijing",
        url: "",
      },
    ],
  },
  {
    heading: "Colin in Paris",
    maps: [
      {
        title: "London",
        url: "https://www.google.com/maps/d/edit?mid=1WW1xk-Wkepg_h1T7tqXrwiX5yTA3lQI&usp=sharing",
      },
      {
        title: "Paris",
        url: "https://www.google.com/maps/d/edit?mid=1eIuv88qYB2z1o_XAkRgbBTaqDOJ_87w&usp=sharing",
      },
    ],
  },
];
