import {
  formatDateForQuery,
  useMonetizationQuery,
} from "@/lib/hooks/useMonetizationQuery";
import { withController } from "@/lib/withController";
import { useEffect, useState } from "react";
import TabedContainer from "../TabbedContainer";
import FullMonetizationHistoryPanel from "./FullMonetizationHistoryPanel";
import { Typography } from "@mui/material";
import GamesPanel from "./GamesPanel";
import SingleInputDateRangePicker from "../SingleInputDateRangePicker";
import sub from "date-fns/sub";

function useController() {
  const today = new Date();
  const oneMonthAgo = sub(today, {
    days: 1,
  });

  const start = formatDateForQuery(oneMonthAgo);
  const end = formatDateForQuery(today);
  const { data, refetch, ...rest } = useMonetizationQuery({ start, end });
  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [tabValue, setTabValue] = useState(0);

  const totalRevenue = data?.monetizations.reduce((acc, cur) => {
    return acc + cur.revenue;
  }, 0);

  const handleDateChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    const { startDate, endDate } = dates;

    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    refetch({
      start: formatDateForQuery(startDate),
      end: formatDateForQuery(endDate),
    }).then(console.log);
  }, [startDate, endDate, refetch]);

  return {
    data: data,
    loading: rest.loading,
    error: rest.error,
    totalRevenue,
    handleDateChange,
    handleTabChange,
    tabValue,
    startDate,
    endDate,
  };
}

function MonetizationDashboard(props: ReturnType<typeof useController>) {
  const {
    data,
    error,
    startDate,
    endDate,
    loading,
    totalRevenue,
    tabValue,
    handleDateChange,
    handleTabChange,
  } = props;

  if (error) return <div>failed to load</div>;

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
        <div className="h-full w-full mb-10">
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
      </div>
      <footer className="flex flex-1 justify-center text-center">
        {/* {totalRevenue && (
          <div>
            <Typography
              component="h1"
              variant="h4"
              color="GrayText"
              align="right"
            >
              Total: {totalRevenue.toFixed(2)}
            </Typography>
          </div>
        )} */}
      </footer>
    </div>
  );
}

export default withController(MonetizationDashboard, useController);
