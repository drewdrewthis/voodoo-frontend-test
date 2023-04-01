import data from "@/__tests__/sampleData/monetization-query.json";
import { createGamesPanelData } from "..";

const {
  data: { monetizations },
} = data as any;

describe("createGamesPanelData", () => {
  it("should return an array of games with their totals", () => {
    const result = createGamesPanelData(monetizations);

    expect(result).toEqual([
      {
        game: "Fire Rides",
        US: 32250.18,
        UK: 32590.01,
        FR: 30463.55,
        JP: 32942.58,
        AU: 32223.95,
        SP: 32203.56,
        totals: 192673.83,
      },
      {
        game: "Fight List",
        US: 32655.81,
        UK: 31920.26,
        FR: 32297.37,
        JP: 31423.01,
        AU: 32036.74,
        SP: 32627.83,
        totals: 192961.02,
      },
      {
        game: "Dune!",
        US: 31547.41,
        UK: 32338.16,
        FR: 31100.43,
        JP: 32635.01,
        AU: 32061.7,
        SP: 33655.94,
        totals: 193338.65,
      },
      {
        game: "Flappy Dunk",
        US: 32637.72,
        UK: 30973.14,
        FR: 32795.05,
        JP: 33745.48,
        AU: 33042.49,
        SP: 31690.37,
        totals: 194884.25,
      },
      {
        game: "Snake vs Block",
        US: 30490.31,
        UK: 31119.72,
        FR: 33229.97,
        JP: 32209.77,
        AU: 32339.23,
        SP: 31462.89,
        totals: 190851.89,
      },
    ]);
  });
});
