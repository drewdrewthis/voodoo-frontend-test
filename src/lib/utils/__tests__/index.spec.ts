import data from "@/__tests__/sampleData/monetization-query.json";
import { addTotalsToData, groupDataByGame, groupTotalsByCountry } from "..";

const {
  data: { monetizations },
} = data as any;

describe("groupDataByGame", () => {
  it("should group data by game", () => {
    const result = groupDataByGame(monetizations);
    expect(result["Fire Rides"]).toEqual(
      expect.arrayContaining([
        {
          conversions: 129,
          country: "US",
          date: "2023-01-01",
          format: "FULLSCREEN",
          game: "Fire Rides",
          os: "iOS",
          placement: "de02fc92-f654-44c3-817d-334a09cf98d9",
          revenue: 1.97,
          views: 4519,
        },
        {
          conversions: 123,
          country: "US",
          date: "2023-01-01",
          format: "FULLSCREEN",
          game: "Fire Rides",
          os: "Android",
          placement: "ac5281b5-b2ea-400c-8d8a-7f8578a24dc5",
          revenue: 26.06,
          views: 36029,
        },
        {
          conversions: 175,
          country: "US",
          date: "2023-01-01",
          format: "REWARDED",
          game: "Fire Rides",
          os: "iOS",
          placement: "7925b9db-ba35-4339-9f81-7d53d3cad2f7",
          revenue: 49.79,
          views: 41609,
        },
      ])
    );
  });
});

describe("groupTotalsByCountry", () => {
  it("should group totals by country", () => {
    const groups = groupDataByGame(monetizations);
    const result = groupTotalsByCountry(groups["Fire Rides"]);
    expect(result).toEqual({
      US: { conversions: 189670, revenue: 32250.179999999993, views: 16693168 },
      UK: { conversions: 200109, revenue: 32590.01, views: 16337793 },
      FR: { conversions: 194042, revenue: 30463.549999999996, views: 16054340 },
      JP: { conversions: 192625, revenue: 32942.58000000001, views: 16256959 },
      AU: { conversions: 190012, revenue: 32223.949999999993, views: 16009257 },
      SP: { conversions: 195380, revenue: 32203.560000000005, views: 16441775 },
    });
  });
});

describe("addTotalsToData", () => {
  it("should add totals to data", () => {
    const groups = groupDataByGame(monetizations);
    const totals = groupTotalsByCountry(groups["Fire Rides"]);
    const results = addTotalsToData(totals);

    console.log(results);

    expect(results).toEqual({
      US: { conversions: 189670, revenue: 32250.179999999993, views: 16693168 },
      UK: { conversions: 200109, revenue: 32590.01, views: 16337793 },
      FR: { conversions: 194042, revenue: 30463.549999999996, views: 16054340 },
      JP: { conversions: 192625, revenue: 32942.58000000001, views: 16256959 },
      AU: { conversions: 190012, revenue: 32223.949999999993, views: 16009257 },
      SP: { conversions: 195380, revenue: 32203.560000000005, views: 16441775 },
      totals: { conversions: 1161838, revenue: 192673.83, views: 97793292 },
    });
  });
});
