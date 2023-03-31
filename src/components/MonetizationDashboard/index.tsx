import { useMonetizationQuery } from "@/lib/hooks/useMonetizationQuery";
import { withController } from "@/lib/withController";
import { useState } from "react";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import omit from "lodash/fp/omit";
import { dateRoundedToDayISO } from "@/lib/utils";
import TabedContainer from "../TabbedContainer";
import FullMonetizationHistoryPanel from "./FullMonetizationHistoryPanel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import { Monetization } from "../../types";
import GamesPanel from "./GamesPanel";

function useController() {
  const today = new Date();
  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);

  const query = useMonetizationQuery({
    start: dateRoundedToDayISO(startDate),
    end: dateRoundedToDayISO(endDate),
  });

  const totalRevenue = query.data?.monetizations.reduce((acc, cur) => {
    return acc + cur.revenue;
  }, 0);

  return {
    ...query,
    totalRevenue,
    setStartDate,
    setEndDate,
  };
}

function MonetizationDashboard(props: ReturnType<typeof useController>) {
  const { data, error, variables, loading, totalRevenue } = props;

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { monetizations } = data;

  return (
    <div className="h-full container">
      <Typography component="h1" variant="h2">
        Monetization Dashboard
      </Typography>
      <div>Total revenue for time period: {totalRevenue}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Basic date picker" />
        <DatePicker label="Basic date picker" />
      </LocalizationProvider>
      <div className="h-full border rounded w-full">
        <TabedContainer
          panels={[
            {
              label: "Revenue Focus",
              content: <GamesPanel data={data} loading={loading} />,
            },
            {
              label: "Full Monetization History",
              content: (
                <FullMonetizationHistoryPanel data={data} loading={loading} />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default withController(MonetizationDashboard, useController);
