import { SeasonWeek } from "features/game/types/game";
import { CHAPTERS, getCurrentSeason } from "features/game/types/chapters";
import { ADMIN_IDS } from "lib/flags";

/**
 * Helper function to get the week number of the season
 * @returns week number of the season 1-12
 */
export function getSeasonWeek(): SeasonWeek {
  const now = Date.now();
  const { startDate, endDate } = CHAPTERS[getCurrentSeason()];
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  const timeDiff = now - startTime;
  const totalWeeks = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

  // Check if the current date is beyond the end date
  if (now >= endTime) {
    throw new Error("The current date is beyond the end date");
  }

  return Math.min(Math.max(totalWeeks + 1, 1), 13) as SeasonWeek; // Return the week number, minimum is 1, maximum is 12
}

/**
 * Helps implement a preseason where tasks are 'frozen'
 * This ensures a smooth transition and testing period.
 */
export function getSeasonChangeover({
  id,
  now = Date.now(),
}: {
  id: number;
  now?: number;
}) {
  const season = getCurrentSeason(new Date(now));

  const tasksCloseAt = CHAPTERS[season].endDate.getTime();

  // 7 days after the season starts
  const tasksStartAt =
    CHAPTERS[season].startDate.getTime() + 7 * 24 * 60 * 60 * 1000;

  const isAdmin = ADMIN_IDS.includes(id);

  return {
    tasksCloseAt,
    tasksStartAt,
    ticketTasksAreClosing:
      now < tasksCloseAt && now >= tasksCloseAt - 24 * 60 * 60 * 1000,
    ticketTasksAreFrozen:
      !isAdmin &&
      now >= CHAPTERS[season].startDate.getTime() &&
      now <= tasksStartAt,
  };
}

/**
 * The days that Bumpkins are on holiday (no deliveries)
 */
const HOLIDAYS: string[] = [
  "2024-11-01",
  "2024-11-02",
  "2024-11-03",
  "2024-11-04",
  "2024-11-05",

  // TODO Auction week
];

export function getBumpkinHoliday({ now = Date.now() }: { now?: number }) {
  // Get upcoming holiday, return today if there is one today.
  const todayKey = new Date(now).toISOString().split("T")[0];

  if (HOLIDAYS.includes(todayKey)) {
    return { holiday: todayKey };
  }

  const nextHoliday = HOLIDAYS.find(
    (holiday) => new Date(holiday) > new Date(now),
  );

  return { holiday: nextHoliday };
}

/**
 * Helper function to get the week number of the season
 * @returns week number of the season 1-12
 */
export function getSeasonWeekByCreatedAt(createdAt: number): SeasonWeek {
  const now = createdAt;

  const season = getCurrentSeason(new Date(now));
  const { startDate, endDate } = CHAPTERS[season];
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  const timeDiff = now - startTime;
  const totalWeeks = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

  // Check if the current date is beyond the end date
  if (now >= endTime) {
    throw new Error("The current date is beyond the end date");
  }

  return Math.min(Math.max(totalWeeks + 1, 1), 13) as SeasonWeek; // Return the week number, minimum is 1, maximum is 12
}
