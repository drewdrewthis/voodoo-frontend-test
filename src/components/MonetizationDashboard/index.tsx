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
    handleDateChange,
  } = props;

  if (error) return <div>failed to load</div>;

  return (
    <div className="h-full container">
      <div className="flex justify-between">
        <Typography component="h1" variant="h2">
          Monetization Dashboard
        </Typography>
        <div>
          <div className="align-end mb-10">
            <SingleInputDateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDatesChange={handleDateChange}
            />
          </div>
          {totalRevenue && (
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
          )}
        </div>
      </div>

      <div className="h-full pb-10 mb-20">
        <div className="h-full border rounded w-full mb-10">
          <TabedContainer
            panels={[
              {
                label: "Revenue Focus",
                content: (
                  <GamesPanel
                    data={data?.monetizations || []}
                    loading={loading}
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
      <footer className="flex justify-center p-10 text-center"></footer>
    </div>
  );
}

export default withController(MonetizationDashboard, useController);
