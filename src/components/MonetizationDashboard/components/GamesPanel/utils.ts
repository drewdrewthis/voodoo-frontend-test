import { GridCellParams, GridTreeNode } from "@mui/x-data-grid-premium";

export const setCellClassName = (
  params: GridCellParams<any, any, any, GridTreeNode>
) => {
  const isMax = isMaxInRow(params.value, params.row);
  return isMax ? "font-bold text-blue-500" : "";
};

function isMaxInRow(value: any, row: Record<string, any>) {
  const values = getRowValues(row);
  if (values?.length === 0) return false;

  const max = Math.max(...values);
  return Number(value) === max;
}

function getRowValues(row: Record<string, any>) {
  return Object.entries(row).reduce((acc, [k, v]) => {
    if (k === "totals") return acc;
    if (typeof v === "number") return [...acc, v];
    return acc;
  }, []);
}
