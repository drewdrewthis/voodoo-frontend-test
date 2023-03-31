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
import { Focus } from "./types";

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
  const columns = Object.keys(omit(["__typename"], panelData[0])).map(
    (key) => ({
      field: key,
      headerName: sentenceCase(key),
      flex: 1,
    })
  );

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
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
      className="w-full mb-auto color-white"
      rows={rows}
      columns={columns}
      apiRef={apiRef}
      loading={loading}
      disableRowSelectionOnClick
      getRowId={(row) => row.game}
      slots={{
        toolbar: GridToolbar,
        // cell: (data) => {
        //   console.log("cell", data);
        //   return (
        //     <div
        //       className="text-white"
        //       style={{
        //         ...data,
        //       }}
        //     >
        //       {data.value}
        //     </div>
        //   );
        // },
      }}
      autoHeight
    />
  );
}

export default withController(GamesPanel, useController);
