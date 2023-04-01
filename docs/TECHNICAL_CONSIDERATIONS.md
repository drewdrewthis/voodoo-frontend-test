# Technical choices:

## NextJS + Vercel

- Robust frontend framework with a complete deployment management pipeline
- Great documentation
- Supports serverless/edge functions

## Use of MUI DataGrid

- Pros:
  - Faster prototyping
  - Great out of box features
- Cons:
  - API not super clear for advanced features (aggregation, nested rows)
  - Nested rows API would not work out of the box/API too difficult
  - Could not update header/footer as desired
  - Some features are paid/need license for use in production

## TailwindCSS

- Fantastic, robust and comprehensive styling toolkit

## Apollo

- Tried and true GraphQL client

## Features:

- [x] Date range selection
- [x] Data display as a table
- [x] Revenue focused data by country
- [x] Light/Dark mode
- [ ] Row details expandable panel
- [x] Highlights for top cells
- [ ] Move GraphQL API call to serverless function layer so as not to expose API key
- [ ] Have default periods, ie 24 hours, 7 Days, 1 month, 1 year

## Optimizations

- [ ] LocalStorage caching for initial load (particulary valuable for development)
- [ ] Allow filters to update GraphQL query. This would only be needed for latentcy issues or database/server constraints.
- [ ] Allow for paginated queries for really long periods (large payloads, timeout concerns)
- [ ] Full mobile audit

## TODO

- [x] Firefox compatibility check
- [ ] E2E Tests
- [ ] Component Tests
- [ ] More unit tests
- [ ] Clean up some layout issues
- [ ] Get currency
