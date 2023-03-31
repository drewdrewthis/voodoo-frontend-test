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

function useController() {
  const today = new Date();
  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);

  const query = useMonetizationQuery({
    start: dateRoundedToDayISO(startDate),
    end: dateRoundedToDayISO(endDate),
  });

  return {
    ...query,
    setStartDate,
    setEndDate,
  };
}

function MonetizationDashboard(props: ReturnType<typeof useController>) {
  const { data, error, variables, loading } = props;
  const apiRef = useGridApiRef();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { monetizations } = data;

  const columns = Object.keys(omit(["__typename"], monetizations[0])).map(
    (key) => ({
      field: key,
      headerName: key,
      flex: 1,
    })
  );

  return (
    <div className="h-full container">
      <h2 className="prose">Monetization Dashboard</h2>
      <div className="h-full border rounded w-full">
        <DataGridPremium
          className="w-full"
          rows={monetizations}
          columns={columns}
          apiRef={apiRef}
          loading={loading}
          disableRowSelectionOnClick
          getRowId={(row) => row.placement}
          slots={{ toolbar: GridToolbar }}
          autoPageSize
          pagination
        />
      </div>
    </div>
  );
}

export default withController(MonetizationDashboard, useController);
