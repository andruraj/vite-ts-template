/**
 * Formats a given date string into the specified date and time formats.
 *
 * @param {string} inputDateString - The input date string in the format "yyyy-mm-ddThh:mm:ss".
 * @param {"dd-mm-yy" | "dd-mm-yyyy" | "mm-dd-yyyy" | "mm-dd-yy" | "Mmm dd, yyyy"} dateFormat - The desired date format, e.g., 'dd-mm-yy', 'dd-mm-yyyy', 'mm-dd-yyyy', 'Mmm dd, yyyy'.
 * @param {'12' | '24'} timeFormat - The desired time format: '12' for 12-hour format with AM/PM, '24' for 24-hour format.
 * @returns {string} The formatted date and time string according to the specified formats.
 */
export const formatDateTime = (
  inputDateString: string,
  dateFormat:
    | "dd-mm-yy"
    | "dd-mm-yyyy"
    | "mm-dd-yyyy"
    | "mm-dd-yy"
    | "Mmm dd, yyyy",
  timeFormat: "12" | "24"
): string => {
  const date = new Date(inputDateString);

  /**
   * Formats the date portion of the date string.
   *
   * @param {string} format - The desired date format string.
   * @returns {string} The formatted date string.
   */
  const formatDate = (format: string): string => {
    return format
      .replace("yyyy", String(date.getFullYear()))
      .replace("yy", String(date.getFullYear()).slice(-2))
      .replace("Mmm", date.toLocaleString("en-US", { month: "short" }))
      .replace("dd", String(date.getDate()).padStart(2, "0"))
      .replace("mm", String(date.getMonth() + 1).padStart(2, "0"));
  };

  /**
   * Formats the time portion of the date string.
   *
   * @param {string} format - The desired time format string.
   * @returns {string} The formatted time string.
   */
  const formatTime = (format: string): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const format12Hours = (h: number): number => ((h + 11) % 12) + 1;
    const ampm = hours >= 12 ? "PM" : "AM";

    return format
      .replace(
        "hh",
        String(timeFormat === "12" ? format12Hours(hours) : hours).padStart(
          2,
          "0"
        )
      )
      .replace("mm", String(minutes).padStart(2, "0"))
      .replace("ss", String(seconds).padStart(2, "0"))
      .replace("AM/PM", ampm);
  };

  const formattedDate = formatDate(dateFormat);
  const formattedTime = formatTime(
    timeFormat === "12" ? "hh:mm:ss AM/PM" : "hh:mm:ss"
  );

  return `${formattedDate} ${formattedTime}`;
};

/**
 * Encodes a given date into the ISO format "yyyy-mm-ddThh:mm:ss.SSS".
 *
 * @param {string | Date} date - The date to encode. Can be a string or a Date object.
 * @returns {string} The encoded date string in ISO format.
 */
export const encodeDateTime = (date: string | Date): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  const milliseconds = dateObj.getMilliseconds().toString().padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
