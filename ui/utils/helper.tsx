export const formatToLocalDate = (dateString: string) => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split("T")[0];
};

export const formatDateTimeUTC = (
  timestamp: string | number | Date
): string => {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
