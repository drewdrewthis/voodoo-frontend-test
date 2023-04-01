import { withController } from "@/lib/withController";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import omit from "lodash/fp/omit";
import { Monetization } from "@/types";
import { sentenceCase } from "@/lib/utils";

interface Props {
  data: Monetization[];
  loading: boolean;
}
function useController(props: Props) {
  const { data } = props;
  const apiRef = useGridApiRef();
  const columnKeys = Object.keys(omit(["__typename"], data[0])) || [];
  const columns =
    columnKeys.map((key) => {
      return {
        field: key,
        headerName: sentenceCase(key),
        type: Number.isNaN(Number(data[0][key])) ? "string" : "number",
        flex: 1,
      };
    }) || [];

  return {
    ...props,
    apiRef,
    columns,
  };
}

function FullMonetizationHistoryPanel(props: ReturnType<typeof useController>) {
  const { data, loading, columns, apiRef } = props;
  const monetizations = data;

  return (
    <DataGridPremium
      className="w-full mb-auto color-white border rounded dark:bg-slate-900"
      rows={monetizations}
      columns={columns}
      apiRef={apiRef}
      loading={loading}
      disableRowSelectionOnClick
      getRowId={(row) => row.placement}
      slots={{ toolbar: GridToolbar }}
      pagination
      initialState={{
        aggregation: {
          model: {
            revenue: "sum",
            views: "sum",
            conversions: "sum",
          },
        },
      }}
    />
  );
}

export default withController(FullMonetizationHistoryPanel, useController);
