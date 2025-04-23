/**
 * Method responsible for converting an ISO date string to a formatted date-time string
 * @param {string} isoDate - the ISO date string to be converted
 * @returns {string}
 */
export function formatIsoToDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}