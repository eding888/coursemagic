// General methods using JS logic to help funcitonality
import { Class } from '../../../coursemagic-api/src/database/postgreDataAccess'

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

// Returns list of class ids that conflict with one of the current classes
export function findClassConflicts(allClasses: Class[], currentClasses: Class[]): Set<number> {
  const classesPerDay: Class[][] = Array(5).fill(null).map(() => []);
  const currentClassesIds = new Set();
  currentClasses.map(certainClass => {
    const days = certainClass.daysofweek.split('');
    currentClassesIds.add(certainClass.classid);
    days.map(day => {
      classesPerDay[parseInt(day) - 1].push(certainClass);
    });
  });

  const conflicts = new Set<number>();

  allClasses.map(certainClass => {
    if(!currentClassesIds.has(certainClass.id)) {
      const days = certainClass.daysofweek.split('');
      for(let i = 0; i < days.length; i++) {
        const day = days[i];
        let run = true;
        classesPerDay[parseInt(day) - 1].some(classAtDay => {
          if((certainClass.endtime > classAtDay.starttime) && (certainClass.starttime < classAtDay.endtime)) {
            conflicts.add(certainClass.id);
            run = false;
            return true;
          }
          return false;
        });
        if (!run) break;
      }
    } else {
      conflicts.add(certainClass.id);
    }
  });
  return conflicts;
}