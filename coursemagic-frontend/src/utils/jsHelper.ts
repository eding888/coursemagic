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

// Converts days of week number array into actual days of week string.
export function daysOfWeekNumsToStr(daysOfWeek: string): string | false {
  const days = daysOfWeek.split("");
  days.sort();

  let out = ""
  days.map((day) => {
    switch(day) {
      case "1":
        out += "Mon, "
        break;
      case "2":
        out += "Tue, "
        break;
      case "3":
        out += "Wed, "
        break;
      case "4":
        out += "Thu, "
        break;
      case "5":
        out += "Fri, "
        break;
      default:
        return false;
    }
  })
  return out.substring(0, out.length - 2);

}