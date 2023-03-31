import { withController } from "@/lib/withController";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import omit from "lodash/fp/omit";
import { Monetization } from "@/types";
import { sentenceCase } from "@/lib/utils";
import { createGamesPanelData } from "./utils";

interface Props {
  data: Monetization[];
  loading: boolean;
}
function useController(props: Props) {
  const apiRef = useGridApiRef();
  const monetizations = props.data;
  const panelData = createGamesPanelData(monetizations);
  const columns = Object.keys(omit(["__typename"], panelData[0])).map(
    (key) => ({
      field: key,
      headerName: sentenceCase(key),
      flex: 1,
    })
  );

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ["conversions", "revenue", "views"],
      },
    },
  });

  return {
    rows: panelData,
    columns,
    loading: props.loading,
    initialState,
    apiRef,
  };
}

function GamesPanel(props: ReturnType<typeof useController>) {
  const { rows, columns, loading, apiRef, initialState } = props;

  return (
    <DataGridPremium
      className="w-full"
      rows={rows}
      columns={columns}
      apiRef={apiRef}
      loading={loading}
      disableRowSelectionOnClick
      getRowId={(row) => row.game}
      slots={{ toolbar: GridToolbar }}
      autoPageSize
      pagination
      aggregationModel={{
        revenue: "sum",
      }}
      initialState={initialState}
      // initialState={{
      //   aggregation: {
      //     model: {
      //       revenue: "sum",
      //     },
      //   },
      // }}
    />
  );
}

export default withController(GamesPanel, useController);
