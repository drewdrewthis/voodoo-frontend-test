import { withController } from "@/lib/withController";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import omit from "lodash/fp/omit";
import { Monetization } from "../../types";

interface Props {
  data: Monetization[];
  loading: boolean;
}
function useController(props: Props) {
  return {
    ...props,
  };
}

function FullMonetizationHistoryPanel(props: ReturnType<typeof useController>) {
  const apiRef = useGridApiRef();
  const { data, loading } = props;
  const monetizations = data;

  const columns = Object.keys(omit(["__typename"], monetizations[0])).map(
    (key) => ({
      field: key,
      headerName: key,
      flex: 1,
    })
  );

  return (
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
      aggregationModel={{
        revenue: "sum",
        views: "sum",
        conversions: "sum",
      }}
      initialState={{
        aggregation: {
          model: {
            revenue: "sum",
          },
        },
      }}
    />
  );
}

export default withController(FullMonetizationHistoryPanel, useController);
