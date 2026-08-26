# Travel Unbounded

A travel company website for **Travel Unbounded** — showcasing destination packages,
telling the company story, and capturing travel enquiries through a booking form that
is validated on both the client and the server, stored in MongoDB Atlas, and confirmed
back to the visitor in the UI.

Built as Phase 1 of the Travel Unbounded Full Stack Web Developer assignment.

- **Live demo:** _(add your Vercel URL here)_
- **Repository:** https://github.com/Sanjay83286/travel-unbounded-fullstack-assignment

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16 — App Router** |
| UI | React 19 |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| Backend | Next.js API Routes (Node.js runtime) |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Hosting | Vercel |

> **Router used: the App Router** (`app/` directory), as required to be stated in the
> assignment brief.

**Why this stack.** Next.js API routes keep the frontend and backend in one
application, so there is a single deployment, no CORS layer and one place for
environment variables. The assignment lists this as the recommended approach, and
MongoDB Atlas pairs naturally with it.

---

## Features

- Responsive marketing site — Home, About, Contact — from 375px to 1440px and beyond
- Hero banner with a call to action that leads to the enquiry form
- 5 India destinations and 5 international destinations, rendered from static data
  through a single reusable `DestinationCard`
- Booking enquiry form with a country-code selector, a future-only date picker and
  per-field inline validation
- **Client-side validation** for instant feedback, and **independent server-side
  validation** because the API can be called without the form
- Loading state with a disabled submit button, an in-page success panel, and
  human-readable error handling — no `alert()` anywhere
- Enquiries persisted to MongoDB with a `createdAt` timestamp
- Per-page SEO titles and meta descriptions

---

## Project Structure

```
travel-unbounded/
├── app/
│   ├── layout.js              # Root layout: fonts, navbar, footer, default metadata
│   ├── page.js                # Home
│   ├── about/page.js          # About
│   ├── contact/page.js        # Contact + enquiry form
│   └── api/enquiry/route.js   # POST + GET /api/enquiry (thin routing layer)
├── components/
│   ├── Navbar.jsx             # Client Component (mobile menu, active route)
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── DestinationCard.jsx    # One reusable card for all 10 destinations
│   ├── DestinationSection.jsx # Titled responsive grid of cards
│   ├── BookingForm.jsx        # Client Component: form state, validation, API call
│   └── SuccessPanel.jsx
├── data/
│   ├── destinations.js        # Static destination data (no database)
│   └── company.js             # Office addresses and "why choose us" content
├── lib/
│   ├── constants.js           # Hotel categories, country codes, numeric bounds
│   ├── mongodb.js             # Cached Mongoose connection
│   ├── validators/enquiry.js  # Validation rules shared by client AND server
│   ├── services/enquiry.js    # Business logic (no HTTP knowledge)
│   └── controllers/enquiry.js # Request handling, status codes, JSON shape
├── models/
│   └── Enquiry.js             # Mongoose schema
└── public/images/             # Destination and hero images
```

The API is deliberately split into **route → controller → service → model**, mirroring
the layering used in an Express or NestJS application: routing knows nothing about
business rules, and the service layer knows nothing about HTTP.

---

## Local Setup

**Prerequisites:** Node.js 18.18+ and a free MongoDB Atlas cluster.

```bash
git clone https://github.com/Sanjay83286/travel-unbounded-fullstack-assignment.git
cd travel-unbounded-fullstack-assignment
npm install
```

Create `.env.local` in the project root (see `.env.example`):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/travel-unbounded?retryWrites=true&w=majority
```

Then:

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string. Include the database name (`/travel-unbounded`) before the query string, otherwise Mongoose writes to the default `test` database. |

`.env.local` is git-ignored; `.env.example` is committed with a blank placeholder.
No credentials are stored in the repository.

---

## API

### `POST /api/enquiry`

Creates an enquiry. Validates server-side, then persists.

**Request body**

```json
{
  "fullName": "Test User",
  "countryCode": "+91",
  "contactNumber": "9876543210",
  "email": "test@example.com",
  "dateOfTravel": "2027-03-15",
  "numberOfPeople": 2,
  "hotelCategory": "Deluxe",
  "numberOfChildren": 1
}
```

**Responses**

| Status | Meaning | Body |
| --- | --- | --- |
| `201` | Created | `{ success: true, message, data: { id, createdAt } }` |
| `400` | Validation failed or malformed JSON | `{ success: false, message, errors: { field: message } }` |
| `500` | Database or server failure | `{ success: false, message }` |

### `GET /api/enquiry`

Returns all stored enquiries, newest first. Listed in the brief as an optional bonus.

| Status | Body |
| --- | --- |
| `200` | `{ success: true, count, data: [...] }` |
| `500` | `{ success: false, message }` |

### Validation rules (enforced on both client and server)

| Field | Rule |
| --- | --- |
| `fullName` | Required, 2–100 characters |
| `countryCode` | Required, must be one of the supported dialling codes |
| `contactNumber` | Required, 6–15 digits |
| `email` | Required, valid email format |
| `dateOfTravel` | Required, must be **strictly after today** |
| `numberOfPeople` | Required, integer, minimum 1 |
| `hotelCategory` | Required, one of `Standard` / `Deluxe` / `Luxury` |
| `numberOfChildren` | Optional, integer, minimum 0, defaults to 0 |

Only known fields are copied to the database, so unexpected keys in a request body are
discarded rather than persisted.

---

## Data Model

`enquiries` collection:

| Field | Type | Notes |
| --- | --- | --- |
| `fullName` | String | trimmed |
| `countryCode` | String | stored separately from the number |
| `contactNumber` | String | String, not Number — preserves leading zeros |
| `email` | String | lowercased |
| `dateOfTravel` | Date | |
| `numberOfPeople` | Number | min 1 |
| `hotelCategory` | String | enum |
| `numberOfChildren` | Number | min 0, default 0 |
| `createdAt` | Date | added automatically by Mongoose timestamps |

---

## Deployment

Deployed on **Vercel**, connected to this GitHub repository.

1. Import the repository into Vercel
2. Add `MONGODB_URI` as an environment variable in the Vercel project settings
3. Deploy

MongoDB Atlas **Network Access** is set to `0.0.0.0/0` because Vercel's serverless
functions use dynamic outbound IPs that cannot be allow-listed individually. The
database remains protected by user credentials held in environment variables; a
production setup would use a static egress IP or MongoDB's Vercel integration.

---

## Assumptions & Decisions

Documented as instructed by the brief, which asks for reasonable assumptions to be
recorded rather than blocked on.

1. **App Router** was chosen over the Pages Router; the brief allows either and asks
   which was used.
2. **Hotel category is treated as a closed set** (`Standard` / `Deluxe` / `Luxury`).
   The brief lists these as an example, but validating against a fixed set is safer
   than accepting arbitrary strings.
3. **`contactNumber` is stored as a String** and the country code as a separate field,
   which keeps leading zeros intact and makes enquiries filterable by region later.
4. **No destination field on the enquiry form.** The brief specifies an exact field
   list that does not include one, so the form matches the specification and each
   destination card's *Enquire* button simply links to the contact page.
5. **Destination images are bundled in `public/images/`** rather than hotlinked. The
   brief suggests `source.unsplash.com`, but that endpoint has been retired by
   Unsplash; local files guarantee the images load in the deployed build, which the
   brief explicitly requires.
6. **Travel-date comparison uses ISO date strings**, so a date is rejected unless it is
   at least the next calendar day. The server compares in its own timezone (UTC on
   Vercel), which can differ from the visitor's by a few hours around midnight.
7. **Upper bounds of 50 people and 50 children** were added defensively. The brief
   specifies only the minimums.
8. **`GET /api/enquiry` is unauthenticated**, matching how the brief describes the
   optional bonus. In production this would expose personal data and belongs behind
   admin authentication — which is exactly what Phase 2 of the brief specifies.

### Not built (and why)

- **Destination detail pages** — not requested anywhere in the brief.
- **An `/admin` page** — described as an optional nice-to-have; the `GET` endpoint that
  would power it is implemented, the page itself was skipped to keep the required
  scope correct and well-tested.
- **Everything in Phase 2** (AI chatbot, itinerary generation, authenticated admin
  dashboard) — the brief states it is explicitly out of scope for Phase 1.

---

## Testing Performed

| Scenario | Expected | Result |
| --- | --- | --- |
| Valid enquiry | `201`, record created, success UI | Pass |
| Empty payload | `400` with every field error | Pass |
| Missing name | `400` | Pass |
| Invalid email | `400` | Pass |
| Past travel date | `400` | Pass |
| Today's date | `400` (must be future) | Pass |
| Zero people | `400` | Pass |
| Negative children | `400` | Pass |
| Invalid hotel category | `400` | Pass |
| Malformed JSON body | `400`, no crash | Pass |
| Unknown fields in body | Ignored, not persisted | Pass |
| `GET /api/enquiry` | `200`, newest first | Pass |
| Responsive at 375 / 768 / 1024 / 1440 | No horizontal scroll | Pass |
