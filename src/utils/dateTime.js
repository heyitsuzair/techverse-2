import moment from "moment";

/**
 * Date and Time formatting utility functions
 */

/**
 * Format date in various formats
 */
export function formatDate(date, format = "MM/DD/YYYY") {
  if (!date) return "";
  return moment(date).format(format);
}

/**
 * Format time in various formats
 */
export function formatTime(date, format = "hh:mm A") {
  if (!date) return "";
  return moment(date).format(format);
}

/**
 * Format date and time together
 */
export function formatDateTime(date, format = "MM/DD/YYYY hh:mm A") {
  if (!date) return "";
  return moment(date).format(format);
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date) {
  if (!date) return "";
  return moment(date).fromNow();
}

/**
 * Get time ago with custom format
 */
export function getTimeAgo(date) {
  if (!date) return "";
  return moment(date).fromNow(true); // "2 hours" instead of "2 hours ago"
}

/**
 * Check if date is today
 */
export function isToday(date) {
  if (!date) return false;
  return moment(date).isSame(moment(), "day");
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date) {
  if (!date) return false;
  return moment(date).isSame(moment().subtract(1, "day"), "day");
}

/**
 * Check if date is this week
 */
export function isThisWeek(date) {
  if (!date) return false;
  return moment(date).isSame(moment(), "week");
}

/**
 * Get start of day
 */
export function startOfDay(date) {
  if (!date) return null;
  return moment(date).startOf("day").toDate();
}

/**
 * Get end of day
 */
export function endOfDay(date) {
  if (!date) return null;
  return moment(date).endOf("day").toDate();
}

/**
 * Add days to a date
 */
export function addDays(date, days) {
  if (!date) return null;
  return moment(date).add(days, "days").toDate();
}

/**
 * Subtract days from a date
 */
export function subtractDays(date, days) {
  if (!date) return null;
  return moment(date).subtract(days, "days").toDate();
}

/**
 * Get difference in days between two dates
 */
export function getDaysDifference(date1, date2) {
  if (!date1 || !date2) return 0;
  return moment(date2).diff(moment(date1), "days");
}

/**
 * Get difference in hours between two dates
 */
export function getHoursDifference(date1, date2) {
  if (!date1 || !date2) return 0;
  return moment(date2).diff(moment(date1), "hours");
}

/**
 * Format date for display with smart formatting
 * Shows relative time for recent dates, full date for older ones
 */
export function formatDateSmart(date) {
  if (!date) return "";
  const now = moment();
  const dateMoment = moment(date);
  const diffInDays = now.diff(dateMoment, "days");

  if (diffInDays === 0) {
    return dateMoment.format("hh:mm A");
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return dateMoment.format("dddd");
  } else if (diffInDays < 365) {
    return dateMoment.format("MMM DD");
  } else {
    return dateMoment.format("MMM DD, YYYY");
  }
}
