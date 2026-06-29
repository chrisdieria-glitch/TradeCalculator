const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Determines which hierarchy level to display based on the time span
 * covered by the given operations.
 *
 * Returns 'years', 'months', or 'days'.
 */
export function getHierarchyLevel(operations) {
  if (operations.length === 0) return 'days';
  const years = new Set(operations.map((op) => op.year));
  if (years.size > 1) return 'years';
  const months = new Set(operations.map((op) => op.month));
  if (months.size > 1) return 'months';
  return 'days';
}

/**
 * Groups operations by year.
 * Returns [{ year, profit, count }] sorted descending by year.
 */
export function groupByYear(operations) {
  const map = {};
  for (const op of operations) {
    if (!map[op.year]) map[op.year] = { year: op.year, profit: 0, count: 0 };
    map[op.year].count += 1;
    if (op.totalProfit !== null && op.totalProfit !== undefined) {
      map[op.year].profit += op.totalProfit;
    }
  }
  return Object.values(map).sort((a, b) => b.year - a.year);
}

/**
 * Groups operations by month within a given year.
 * Returns [{ month, monthLabel, profit, count }] sorted by month.
 */
export function groupByMonth(operations, year) {
  const filtered = year !== undefined
    ? operations.filter((op) => op.year === year)
    : operations;
  const map = {};
  for (const op of filtered) {
    if (!map[op.month]) {
      map[op.month] = { month: op.month, monthLabel: MONTH_NAMES[op.month], profit: 0, count: 0 };
    }
    map[op.month].count += 1;
    if (op.totalProfit !== null && op.totalProfit !== undefined) {
      map[op.month].profit += op.totalProfit;
    }
  }
  return Object.values(map).sort((a, b) => b.month - a.month);
}

/**
 * Groups operations by day within a given year and month.
 * Returns [{ day, profit, operations }] sorted by day descending.
 */
export function groupByDay(operations, year, month) {
  const filtered = operations.filter(
    (op) => op.year === year && op.month === month
  );
  const map = {};
  for (const op of filtered) {
    if (!map[op.day]) map[op.day] = { day: op.day, profit: 0, operations: [] };
    map[op.day].profit += op.totalProfit !== null && op.totalProfit !== undefined ? op.totalProfit : 0;
    map[op.day].operations.push(op);
  }
  return Object.values(map).sort((a, b) => b.day - a.day);
}
