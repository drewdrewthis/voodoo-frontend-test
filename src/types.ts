export type Monetization = {
  // example: 2021-09-01
  // The date of the monetization info
  date: string;

  // example: FR
  // The country of the monetization info
  country: string;

  // example: REWARDED
  // The type of ad format that gets this monetization
  format: string;

  // example: iOS
  // The platform of the monetization info
  os: string;

  // example: Dune!
  // The game that gets the monetization
  game: string;

  // example: 1ee4fdae-379e-44a7-b8f0-d26fcdcae8e7
  // The placement ID for this ad
  placement: string;

  // example: 10542
  // The number of views that led to this monetization
  views: number;

  // example: 211
  // The number of conversions related to the views
  conversions: number;

  // example: 5.236
  // The revenue in €(EUR) created by this monetization
  revenue: number;
};
