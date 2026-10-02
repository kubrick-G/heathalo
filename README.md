# HeatHalo

**Neighborhood heat intelligence that turns climate risk into a plan people can use.**

HeatHalo is a dependency-free public demo for the AWS Builder Center **Zero to Shipped** hackathon. It is positioned in **Social Good → Climate resilience** and the **Community** lane.

## What to demo

1. Start on the hero and click **Open the neighborhood view**.
2. Change the scenario to **Tomorrow** to show the risk signal, factors, and impact estimate update together.
3. Select different blocks on the illustrated map; the priority score and explanation update.
4. Switch to **Organizer view** and complete one or two action items.
5. Scroll to the architecture story to explain the production path: ingestion, geospatial scoring, AI-assisted recommendations, and community coordination with human oversight.

## Development

```bash
npm start
```

The server listens on `0.0.0.0:${PORT:-3000}`. `/health` returns a small JSON readiness response. The app uses curated demo data to make the judging experience deterministic and transparent.

## Production path

A production version can connect live weather and environmental data through a managed ingestion layer, persist community action records, add geospatial processing and a reviewed recommendation service, and publish monitored APIs and impact snapshots. The UI intentionally labels current data as demo data rather than implying live coverage or medical authority.

## Hackathon entry positioning

- **Project:** HeatHalo — Neighborhood Heat Resilience
- **Category:** `#social-good`
- **Lane:** `#community`
- **Focus area:** Climate resilience
- **One-line story:** Heat is not evenly distributed. HeatHalo helps a neighborhood see where heat will hurt most, then move cooling resources there first.
