import { format } from 'date-fns';

export function formatDate(date: Date) {
  const formatted = format(date, 'MMMM d, yyyy kk:mm');
  return formatted;
}
