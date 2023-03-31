import { useQuery, gql } from "@apollo/client";
import { Monetization } from "../../types";


const MONETIZATION_QUERY = gql`
  query Query($start: DateTime!, $end: DateTime!) {
    monetizations(start: $start, end: $end) {
      game
      country
      conversions
      date
      format
      os
      placement
      revenue
      views
    }
  }
`;

export const useMonetizationQuery = (args: {
  // A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  start: string;
  // A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  end: string;
}) => {
  const { start, end } = args;

  return useQuery<{ monetizations: Monetization[] }>(MONETIZATION_QUERY, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    variables: {
      start,
      end,
    },
    onError: (error) => console.error(error),
  });
};
