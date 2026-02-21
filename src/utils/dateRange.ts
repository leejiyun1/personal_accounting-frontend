export interface RecentYearMonthOptions {
  months: number;
  from?: Date;
}

export const getRecentYearMonths = ({
  months,
  from = new Date(),
}: RecentYearMonthOptions): string[] => {
  const result: string[] = [];

  for (let i = 0; i < months; i += 1) {
    const current = new Date(from.getFullYear(), from.getMonth() - i, 1);
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    result.push(`${year}-${month}`);
  }

  // Oldest -> latest order to keep stable ordering before downstream sorting.
  return result.reverse();
};
