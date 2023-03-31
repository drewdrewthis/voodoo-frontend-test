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
        US: {
          conversions: 189670,
          revenue: 32250.179999999993,
          views: 16693168,
        },
        UK: { conversions: 200109, revenue: 32590.01, views: 16337793 },
        FR: {
          conversions: 194042,
          revenue: 30463.549999999996,
          views: 16054340,
        },
        JP: {
          conversions: 192625,
          revenue: 32942.58000000001,
          views: 16256959,
        },
        AU: {
          conversions: 190012,
          revenue: 32223.949999999993,
          views: 16009257,
        },
        SP: {
          conversions: 195380,
          revenue: 32203.560000000005,
          views: 16441775,
        },
        totals: { conversions: 1161838, revenue: 192673.83, views: 97793292 },
      },
      {
        game: "Fight List",
        US: {
          conversions: 194685,
          revenue: 32655.810000000005,
          views: 16472208,
        },
        UK: { conversions: 196327, revenue: 31920.26, views: 16025316 },
        FR: {
          conversions: 192129,
          revenue: 32297.370000000006,
          views: 16528975,
        },
        JP: {
          conversions: 192772,
          revenue: 31423.00999999997,
          views: 15896921,
        },
        AU: {
          conversions: 195902,
          revenue: 32036.740000000023,
          views: 16466254,
        },
        SP: { conversions: 194928, revenue: 32627.83, views: 16282809 },
        totals: {
          conversions: 1166743,
          revenue: 192961.02000000002,
          views: 97672483,
        },
      },
      {
        game: "Dune!",
        US: {
          conversions: 200940,
          revenue: 31547.409999999985,
          views: 16693839,
        },
        UK: {
          conversions: 191670,
          revenue: 32338.159999999978,
          views: 16080097,
        },
        FR: { conversions: 192967, revenue: 31100.43, views: 16340938 },
        JP: {
          conversions: 194421,
          revenue: 32635.010000000002,
          views: 16236912,
        },
        AU: {
          conversions: 194918,
          revenue: 32061.699999999997,
          views: 16110940,
        },
        SP: {
          conversions: 199090,
          revenue: 33655.939999999995,
          views: 16844244,
        },
        totals: {
          conversions: 1174006,
          revenue: 193338.64999999997,
          views: 98306970,
        },
      },
      {
        game: "Flappy Dunk",
        US: {
          conversions: 193257,
          revenue: 32637.719999999983,
          views: 16945943,
        },
        UK: { conversions: 202918, revenue: 30973.14, views: 16696997 },
        FR: {
          conversions: 192950,
          revenue: 32795.050000000025,
          views: 17479575,
        },
        JP: { conversions: 199096, revenue: 33745.48, views: 16755656 },
        AU: {
          conversions: 193631,
          revenue: 33042.48999999998,
          views: 16369817,
        },
        SP: {
          conversions: 197243,
          revenue: 31690.37000000001,
          views: 16721786,
        },
        totals: { conversions: 1179095, revenue: 194884.25, views: 100969774 },
      },
      {
        game: "Snake vs Block",
        US: {
          conversions: 188475,
          revenue: 30490.310000000027,
          views: 16530881,
        },
        UK: {
          conversions: 189011,
          revenue: 31119.719999999998,
          views: 15876141,
        },
        FR: {
          conversions: 193787,
          revenue: 33229.970000000016,
          views: 16891660,
        },
        JP: {
          conversions: 195185,
          revenue: 32209.769999999993,
          views: 16691112,
        },
        AU: {
          conversions: 193668,
          revenue: 32339.23000000002,
          views: 16199642,
        },
        SP: {
          conversions: 186632,
          revenue: 31462.889999999978,
          views: 16461318,
        },
        totals: {
          conversions: 1146758,
          revenue: 190851.89000000004,
          views: 98650754,
        },
      },
    ]);
  });
});
