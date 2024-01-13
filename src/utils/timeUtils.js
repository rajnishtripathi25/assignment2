/**
 * Calculate the duration between two timestamps in a readable format.
 *
 * @param {Date} startTimestamp - The starting timestamp (Date object).
 * @param {Date} endTimestamp - The ending timestamp (Date object).
 * @returns {string} - The duration in a readable format (e.g., '2d 3h 4m 5s 300ms').
 *                    Returns 'Invalid duration' if endTimestamp is before startTimestamp or inputs are invalid.
 */
const calculateDuration = (startTimestamp, endTimestamp) => {
  // Check if inputs are valid Date objects
  if (!(startTimestamp instanceof Date) || !(endTimestamp instanceof Date)) {
    return 'Invalid date(s)';
  }

  let durationMs = endTimestamp - startTimestamp;

  // Handle edge cases for negative durations (if endTimestamp is before startTimestamp)
  if (durationMs < 0) {
    return 'Invalid duration';
  }

  // Define time units in milliseconds
  const timeUnits = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  // Calculate time components
  const days = Math.floor(durationMs / timeUnits.day);
  durationMs -= days * timeUnits.day;
  const hours = Math.floor(durationMs / timeUnits.hour);
  durationMs -= hours * timeUnits.hour;
  const minutes = Math.floor(durationMs / timeUnits.minute);
  durationMs -= minutes * timeUnits.minute;
  const seconds = Math.floor(durationMs / timeUnits.second);
  const milliseconds = durationMs % timeUnits.second;

  // Construct a readable format
  const readableParts = [
    days > 0 ? `${days}d` : '',
    hours > 0 ? `${hours}h` : '',
    minutes > 0 ? `${minutes}m` : '',
    seconds > 0 ? `${seconds}s` : '',
    milliseconds > 0 ? `${milliseconds}ms` : '',
  ].filter((part) => part !== '');

  // Join the non-empty parts with a space
  const readable = readableParts.join(' ');

  // If all values are zero, the duration is effectively 0ms
  return readable || '0ms';
}

module.exports = {
  calculateDuration,
};
