import { useMonetizationQuery } from "@/lib/hooks/useMonetizationQuery";
import { withController } from "@/lib/withController";
import { Config } from "@/config";
import { useState } from "react";

function dateRoundedToDayISO(date: Date) {
  const roundedDate = new Date(date);
  roundedDate.setHours(0, 0, 0, 0);
  return roundedDate.toISOString();
}

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
  const { data, error, variables } = props;

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data, variables);

  return (
    <div>
      <h2 className="prose">Monetization Dashboard</h2>
      {JSON.stringify(data)}
    </div>
  );
}

export default withController(MonetizationDashboard, useController);
