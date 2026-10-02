# HeatHalo — implementation plan

## Product direction
HeatHalo is a public, demo-first climate-resilience app for neighborhoods facing extreme heat. It converts a small set of understandable signals into a risk level, highlights blocks where exposure and vulnerability overlap, and turns the result into prioritized actions that residents and community organizers can act on today.

The hackathon position is **Social Good → Climate resilience → Community lane**. The demo is intentionally transparent: it uses curated sample data, labels assumptions, avoids pretending to provide medical advice, and makes the path to live data and community records explicit.

## Design system
- **Design movement:** editorial data storytelling with a field-notebook feel—calm enough for a public-service tool, vivid enough to make heat visible.
- **Core principles:** signal before complexity; explain every score; action over alarm; dignity for vulnerable residents.
- **Color philosophy:** near-black ink and warm paper create trust and legibility; electric coral marks heat and urgency; mint and sky blue represent cooling, water, and collective care; yellow is reserved for the attention state.
- **Layout paradigm:** a left narrative rail paired with a wide operational canvas. The main dashboard uses overlapping panels and a vertical “heat trail” rather than a generic centered card grid.
- **Signature elements:** a halo ring around the risk score, dotted “heat trail” connectors on the block view, and hand-drawn marker labels for assumptions and impact evidence.
- **Interaction philosophy:** every interactive control should answer “what should I do next?”; changing the neighborhood scenario updates the score, block ranking, and action checklist together.
- **Animation:** subtle, short pulses on live-risk indicators; no decorative motion that competes with warning states; checklist completion uses a soft slide and color shift.
- **Typography:** Space Grotesk for headings and IBM Plex Mono for metrics, labels, and evidence notes. Body copy uses system sans for compact readability.
- **Brand essence:** Neighborhood heat intelligence that turns climate risk into a plan people can use. Personality: grounded, urgent, generous.
- **Brand voice:** direct, human, practical. Example lines: “Heat is not evenly distributed.” and “Start with the block that needs you most.”
- **Wordmark / mark:** a compact coral halo orbiting a mint dot, paired with the HeatHalo wordmark.
- **Signature brand color:** Heat Coral `#ff6b5f`.

## Implementation approach
This first ship is a dependency-free static web app served by a tiny Node HTTP server on port 3000. It includes a single responsive route (`/`) and uses curated scenario data in `app.js` so the experience is stable for judges and AI scoring. The UI is intentionally product-like rather than a slide deck: scenario switching, tabs, filters, progress actions, a shareable impact snapshot, and an architecture story all work without a backend.

The production path is documented in the app: an AWS version would replace the local data module with an ingestion path, persistent community action records, geospatial processing, an API layer, and monitored deployment. No claim is made that this demo is currently running on AWS.

## Project structure
- `server.js` — zero-dependency static server, with `PORT` support and a health route.
- `index.html` — semantic app shell and all page sections.
- `styles.css` — responsive visual system, panel primitives, map view, states, and motion.
- `app.js` — scenario data, dashboard state, interactions, and accessible announcements.
- `manus-routes.json` — declared route manifest for the preview/publisher.
- `app.config.ts` — project logo metadata.

## Required behavior
- Show a current neighborhood heat-risk signal with explainable factors and a confidence note.
- Rank blocks by exposure and vulnerability, with an obvious highest-priority block.
- Turn risk into a resident checklist and an organizer action queue.
- Update visible metrics and content when scenario changes.
- Explain data limitations, responsible use, and the AWS-native production architecture.
- Stay usable on mobile widths and keyboard navigable.
