import { Monetization } from "../../types";

export function dateRoundedToDayISO(date: Date) {
  const roundedDate = new Date(date);
  roundedDate.setHours(0, 0, 0, 0);
  return roundedDate.toISOString();
}

export function groupDataByGame(data: Monetization[]) {
  return data.reduce((acc, item) => {
    const game = item.game;
    if (!acc[game]) {
      acc[game] = [];
    }
    acc[game].push(item);
    return acc;
  }, {} as Record<string, Monetization[]>);
}

export function groupTotalsByCountry(data: Monetization[]) {
  return data.reduce((acc, item) => {
    const country = item.country;
    if (!acc[country]) {
      acc[country] = {
        conversions: 0,
        revenue: 0,
        views: 0,
      };
    }
    acc[country].conversions += item.conversions;
    acc[country].revenue += item.revenue;
    acc[country].views += item.views;
    return acc;
  }, {});
}

export function addTotalsToData(data: {
  [country: string]: {
    conversions: number;
    revenue: number;
    views: number;
  };
}) {
  const totals = {
    conversions: 0,
    revenue: 0,
    views: 0,
  };

  for (const country in data) {
    totals.conversions += data[country].conversions;
    totals.revenue += data[country].revenue;
    totals.views += data[country].views;
  }

  return { ...data, totals };
}

export function sentenceCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
