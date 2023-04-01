import {
  formatDateForQuery,
  useMonetizationQuery,
} from "@/lib/hooks/useMonetizationQuery";
import { useEffect, useState } from "react";
import sub from "date-fns/sub";
import { useTabsController } from "./useTabsController";
import { useFiltersController } from "./useFiltersController";
import { filterDataByFilters } from "../utils";

export function useMonetizationDashboardController() {
  const today = new Date();
  const oneMonthAgo = sub(today, {
    days: 1,
  });

  const start = formatDateForQuery(oneMonthAgo);
  const end = formatDateForQuery(today);
  const { data, refetch, ...rest } = useMonetizationQuery({ start, end });
  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const { tabValue, handleTabChange } = useTabsController();
  const { monetizations = [] } = data || {};

  const { filters, toggleFilter } = useFiltersController({
    data: monetizations,
  });

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
    refetch &&
      refetch({
        start: formatDateForQuery(startDate),
        end: formatDateForQuery(endDate),
      }).then((params) => console.log("refetch", params));
  }, [startDate, endDate, refetch]);

  const filteredData = filterDataByFilters(monetizations, filters);

  return {
    data: filteredData,
    loading: rest.loading,
    error: rest.error,
    handleDateChange,
    handleTabChange,
    toggleFilter,
    filters,
    tabValue,
    startDate,
    endDate,
  };
}
