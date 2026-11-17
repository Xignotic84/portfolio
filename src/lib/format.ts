import { differenceInMonths, format, formatDuration, parseISO } from "date-fns";

type Range = { start: string; end?: string };

export const formatMonth = (date: string) => (date.length === 4 ? date : format(parseISO(date), "MMM yyyy"));

export const formatPeriod = ({ start, end }: Range) => `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;

export function formatLength(ranges: Range[]) {
  const months = ranges.reduce(
    (total, { start, end }) => total + differenceInMonths(end ? parseISO(end) : new Date(), parseISO(start)) + 1,
    0,
  );
  return formatDuration({ years: Math.floor(months / 12), months: months % 12 });
}
