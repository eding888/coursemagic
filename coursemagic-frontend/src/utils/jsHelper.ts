// General methods using JS logic to help funcitonality

// Converts minute to 2 hours format time.
export function convertTo12HourFormat(minutes: number): string {
  if (isNaN(minutes) || minutes < 0 || minutes >= 24 * 60) {
    throw new Error("Invalid input. Please provide a valid minute amount.");
  }

  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const period = hours < 12 ? "AM" : "PM";

  const formattedMinutes = remainderMinutes < 10 ? `0${remainderMinutes}` : `${remainderMinutes}`;

  return `${formattedHours}:${formattedMinutes} ${period}`;
}