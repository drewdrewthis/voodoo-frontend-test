export function dateRoundedToDayISO(date: Date) {
  const roundedDate = new Date(date);
  roundedDate.setHours(0, 0, 0, 0);
  return roundedDate.toISOString();
}

export function groupDataByGame(data: any[]) {
  return data.reduce((acc: any, item: any) => {
    const game = item.game;
    if (!acc[game]) {
      acc[game] = [];
    }
    acc[game].push(item);
    return acc;
  }, {});
}
