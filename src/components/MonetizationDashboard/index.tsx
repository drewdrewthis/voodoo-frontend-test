import { withController } from "@/lib/withController";
import TabedContainer from "../TabbedContainer";
import FullMonetizationHistoryPanel from "./FullMonetizationHistoryPanel";
import { Typography } from "@mui/material";
import GamesPanel from "./GamesPanel";
import SingleInputDateRangePicker from "../SingleInputDateRangePicker";
import { useMonetizationDashboardController } from "./hooks";
import CheckboxFilterGroup from "../CheckboxFilterGroup";

function MonetizationDashboard(
  props: ReturnType<typeof useMonetizationDashboardController>
) {
  const {
    data,
    error,
    startDate,
    endDate,
    loading,
    tabValue,
    filters,
    handleDateChange,
    handleTabChange,
    toggleFilter,
  } = props;

  if (error) return <div>failed to load</div>;

  // For some reason, this is creates a race condition that allows the data to load consistently
  // This is likely an issue with development mode firing hooks twice. It doesn't happen in production.
  // console.log(data);

  return (
    <div className="h-full container flex flex-col">
      <div className="flex md:flex-row flex-col justify-between items-center mb-10 content-center">
        <Typography
          component="h1"
          variant="h2"
          className="text-3xl mb-10 md:mb-0 pt-0 md:text-3xl lg:text-5xl xl:text-6xl"
        >
          Monetization Dashboard
        </Typography>
        <SingleInputDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleDateChange}
        />
      </div>

      <div className="h-full pb-10 mb-20">
        <div className="h-full w-full">
          <TabedContainer
            value={tabValue}
            onTabChange={handleTabChange}
            panels={[
              {
                label: "Revenue",
                content: (
                  <GamesPanel
                    data={data?.monetizations || []}
                    loading={loading}
                    focus="revenue"
                  />
                ),
              },
              {
                label: "Views",
                content: (
                  <GamesPanel
                    data={data?.monetizations || []}
                    loading={loading}
                    focus="views"
                  />
                ),
              },
              {
                label: "Conversions",
                content: (
                  <GamesPanel
                    data={data?.monetizations || []}
                    loading={loading}
                    focus="conversions"
                  />
                ),
              },
              {
                label: "Full Monetization History",
                content: (
                  <FullMonetizationHistoryPanel
                    data={data?.monetizations || []}
                    loading={loading}
                  />
                ),
              },
            ]}
          />
        </div>
        <div className="p-3">
          <CheckboxFilterGroup
            label="Format"
            filters={filters.format}
            onOptionClick={(value) => toggleFilter("format", value)}
          />
          <CheckboxFilterGroup
            label="OS"
            filters={filters.os}
            onOptionClick={(value) => toggleFilter("os", value)}
          />
        </div>
      </div>
      <footer className="flex flex-1 justify-center text-center"></footer>
    </div>
  );
}

export default withController(
  MonetizationDashboard,
  useMonetizationDashboardController
);
