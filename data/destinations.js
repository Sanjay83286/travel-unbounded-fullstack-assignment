/**
 * Static destination catalogue.
 *
 * The assignment specifies that destination and pricing data is dummy/static and
 * should live in a local file rather than a database, so this array is the single
 * source of truth for both the India and International sections on the home page.
 *
 * Prices are indicative "starting from" values in INR, per person.
 */
export const destinations = [
  // ---------------------------------------------------------------- India
  {
    id: 1,
    name: "Kerala",
    country: "India",
    image: "/images/kerala.jpg",
    description:
      "Drift through palm-fringed backwaters on a private houseboat, wake to mist over the tea hills of Munnar, and end your days with an Ayurvedic massage by the Arabian Sea.",
    price: 25000,
    category: "india",
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    country: "India",
    image: "/images/himachal.jpg",
    description:
      "Cedar forests, apple orchards and old colonial hill stations. Trek the Parvati Valley, cross into Spiti's high desert, and sleep under some of the clearest skies in India.",
    price: 22000,
    category: "india",
  },
  {
    id: 3,
    name: "Ladakh",
    country: "India",
    image: "/images/ladakh.jpg",
    description:
      "High-altitude monasteries, the impossible blue of Pangong Tso, and roads that climb past 17,000 feet. A raw, quiet landscape unlike anywhere else on the subcontinent.",
    price: 38000,
    category: "india",
  },
  {
    id: 4,
    name: "Andaman",
    country: "India",
    image: "/images/andaman.jpg",
    description:
      "White sand, warm turquoise shallows and some of Asia's finest coral. Dive at Havelock, kayak through mangrove creeks, and watch the sun drop behind Radhanagar Beach.",
    price: 32000,
    category: "india",
  },
  {
    id: 5,
    name: "Goa",
    country: "India",
    image: "/images/goa.jpg",
    description:
      "Far more than its beaches — Portuguese quarters in Fontainhas, spice plantations inland, sunrise dolphin runs, and a food scene worth travelling for on its own.",
    price: 18000,
    category: "india",
  },

  // -------------------------------------------------------- International
  {
    id: 6,
    name: "Kenya",
    country: "Kenya",
    image: "/images/kenya.jpg",
    description:
      "Dawn game drives in the Masai Mara with our own Nairobi-based guides, the Great Migration in season, and nights in tented camps on the edge of the savannah.",
    price: 145000,
    category: "international",
  },
  {
    id: 7,
    name: "Vietnam",
    country: "Vietnam",
    image: "/images/vietnam.jpg",
    description:
      "Cruise the limestone karsts of Ha Long Bay at sunset, wander lantern-lit Hoi An, and eat your way through Hanoi's Old Quarter with a local guide.",
    price: 95000,
    category: "international",
  },
  {
    id: 8,
    name: "Tanzania",
    country: "Tanzania",
    image: "/images/tanzania.jpg",
    description:
      "The Serengeti plains, the Ngorongoro Crater's contained wilderness, and the option to finish on the white sand of Zanzibar. Big Five country at its very best.",
    price: 165000,
    category: "international",
  },
  {
    id: 9,
    name: "Iceland",
    country: "Iceland",
    image: "/images/iceland.jpg",
    description:
      "Waterfalls you can walk behind, black volcanic beaches, glacier lagoons and — between September and March — a genuine chance at the northern lights.",
    price: 185000,
    category: "international",
  },
  {
    id: 10,
    name: "Sri Lanka",
    country: "Sri Lanka",
    image: "/images/srilanka.jpg",
    description:
      "Hill-country tea estates reached by one of the world's great train rides, leopards at Yala, ancient rock fortresses, and the whole island crossable in a week.",
    price: 68000,
    category: "international",
  },
];

/** Destinations within India, in the order specified by the assignment. */
export const indiaDestinations = destinations.filter(
  (destination) => destination.category === "india"
);

/** Destinations outside India, in the order specified by the assignment. */
export const internationalDestinations = destinations.filter(
  (destination) => destination.category === "international"
);
