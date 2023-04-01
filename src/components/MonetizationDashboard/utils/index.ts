import {
  addTotalsToData,
  groupDataByGame,
  groupTotalsByCountry,
} from "@/lib/utils";
import { Monetization } from "../../../types";
import { Focus } from "../types";

export function createGamesPanelData(
  monetizations: Monetization[],
  options?: { focus: Focus }
) {
  const { focus = "revenue" } = options || {};
  const groupedData = groupDataByGame(monetizations);

  const gamesPanelData = Object.entries(groupedData).map(([game, data]) => {
    const totals = groupTotalsByCountry(data);
    const withTotals = addTotalsToData(totals);
    const onlyRevenue = Object.entries(withTotals).reduce(
      (acc, [country, totals]) => {
        const focusData = totals[focus].toFixed(2);
        acc[country] = Number(focusData);
        return acc;
      },
      {} as any
    );

    return {
      game,
      ...onlyRevenue,
    };
  });

  return gamesPanelData;
}

export function filterDataByFilters(
  data: Monetization[],
  filters: {
    format: Record<string, boolean>;
    os: Record<string, boolean>;
  }
) {
  const { format, os } = filters;
  const filteredData = data.filter((monetization) => {
    const { os: monetizationOs, format: monetizationFormat } = monetization;
    return os[monetizationOs] && format[monetizationFormat];
  });

  return filteredData;
}
