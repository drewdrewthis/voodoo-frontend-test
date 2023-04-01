import { useState } from "react";
import { Monetization } from "../../../types";

interface Props {
  data: Monetization[];
}
export function useFiltersController(props: Props) {
  const extractedFilters = extractFilters(props.data);
  const [filters, setFilters] = useState(extractedFilters);

  return {
    filters,
    toggleFilter: (group: "os" | "format", filter: string) => {
      setFilters((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [filter]: !prev[group][filter],
        },
      }));
    },
  };
}

function extractFilters(data: Monetization[]) {
  const filters = data.reduce(
    (acc, curr) => {
      acc.format[curr.format] = true;
      acc.os[curr.os] = true;
      return acc;
    },
    {
      format: {},
      os: {},
    } as {
      format: Record<string, boolean>;
      os: Record<string, boolean>;
    }
  );

  return filters;
}
