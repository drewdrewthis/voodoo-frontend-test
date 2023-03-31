import { useQuery, gql } from "@apollo/client";

const MONETIZATION_QUERY = gql`
  query Query($start: DateTime!, $end: DateTime!) {
    monetizations(start: $start, end: $end) {
      conversions
      country
      date
      format
      game
      os
      placement
      revenue
      views
    }
  }
`;

export const useMonetizationQuery = (args: { start: string; end: string }) => {
  const { start, end } = args;

  return useQuery(MONETIZATION_QUERY, {
    variables: {
      start,
      end,
    },
  });
};
