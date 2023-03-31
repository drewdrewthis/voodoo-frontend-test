import {
  addTotalsToData,
  groupDataByGame,
  groupTotalsByCountry,
} from "@/lib/utils";
import { Monetization } from "../../../types";

export function createGamesPanelData(
  monetizations: Monetization[],
  options?: { focus: "revenue" }
) {
  const { focus = "revenue" } = options || {};
  const groupedData = groupDataByGame(monetizations);

  const gamesPanelData = Object.entries(groupedData).map(([game, data]) => {
    const totals = groupTotalsByCountry(data);
    const withTotals = addTotalsToData(totals);
    const onlyRevenue = Object.entries(withTotals).reduce(
      (acc, [country, totals]) => {
        const focusData = totals[focus].toFixed(2);
        acc[country] = focusData;
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
