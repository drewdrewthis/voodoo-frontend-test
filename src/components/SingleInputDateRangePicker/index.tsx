import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import cx from "classnames";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onDatesChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}
export default function SingleInputDateRangePicker(props: Props) {
  const { startDate, endDate, onDatesChange } = props;

  return (
    <div className="flex flex-col items-end">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          className={cx("bg-slate-100 rounded border", styles.container)}
          slots={{ field: SingleInputDateRangeField }}
          value={[dayjs(startDate), dayjs(endDate)]}
          onChange={(data: any) => {
            onDatesChange({
              startDate: data[0]?.$d,
              endDate: data[1]?.$d,
            });
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
