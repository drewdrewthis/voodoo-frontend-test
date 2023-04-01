import { withController } from "@/lib/withController";
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import omit from "lodash/fp/omit";
import { Monetization } from "@/types";
import { sentenceCase } from "@/lib/utils";
import { createGamesPanelData } from "../../utils";
import { Focus } from "../../types";
import { setCellClassName } from "./utils";

interface Props {
  data: Monetization[];
  loading: boolean;
  focus?: Focus;
}
function useController(props: Props) {
  const apiRef = useGridApiRef();
  const { data, focus = "revenue" } = props;
  const monetizations = data;
  const panelData = createGamesPanelData(monetizations, { focus });
  const columnKeys = Object.keys(omit(["__typename"], panelData[0])) || [];
  const columns =
    columnKeys.map((key) => ({
      field: key,
      headerName: sentenceCase(key),
      type: key === "game" ? "string" : "number",
      flex: 1,
    })) || [];

  const aggregationModel = columnKeys.reduce(
    (acc, key) => {
      if (key === "game") return acc;
      acc[key] = "sum";
      return acc;
    },
    {
      totals: "sum",
    }
  );

  return {
    rows: panelData,
    columns,
    loading: props.loading,
    aggregationModel,
    apiRef,
  };
}

function GamesPanel(props: ReturnType<typeof useController>) {
  const { rows, columns, loading, apiRef, aggregationModel } = props;

  return (
    <DataGridPremium
      className="w-full mb-auto color-white border rounded dark:bg-slate-900"
      rows={rows}
      columns={columns}
      apiRef={apiRef}
      loading={loading}
      disableRowSelectionOnClick
      getRowId={(row) => row.game}
      slots={{
        toolbar: GridToolbar,
      }}
      getCellClassName={setCellClassName}
      aggregationModel={aggregationModel}
      aggregationRowsScope="all"
      autoHeight
    />
  );
}

export default withController(GamesPanel, useController);
