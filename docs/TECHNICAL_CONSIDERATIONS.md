# Technical choices:

## NextJS + Vercel

## Apollo LocalStorage caching

## Use of MUI DataGrid

- Pros:
  - Faster prototyping
  - Great out of box features
- Cons:
  - API not super clear for advanced features (aggregation, nested rows)
  - Nested rows API would not work out of the box/API too difficult
  - Could not update header/footer as desired
  - Some features are paid/need license for use in production

## Features:

[X] Date range selection
[X] Data display as a table
[X] Revenue focused data by country
[X] Light/Dark mode
[ ] Row details
[ ] Highlights for top cells
[ ] Move GraphQL API call to serverless function layer so as not to expose API key

## Optimizations

[ ] LocalStorage caching for initial load (particulary valuable for development)
[ ] Allow filters to update GraphQL query. This would only be needed for latentcy issues or database/server constraints.

## TODO

[ ] E2E Tests
[ ] Component Tests
[ ] More unit tests
