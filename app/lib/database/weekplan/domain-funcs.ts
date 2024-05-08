import { db } from "../firestore.server";
import { allTasks, demoData } from "./demo-data";
import { DayTask, ValidDay, WeekPlan, WeekTaskData } from "./types";

export const createDayTaskStatus = (dayName: ValidDay, dayTasks: DayTask[]) => {
  const statusArray = dayTasks.map((task, index) => {
    const stringIndex = (index + 1).toString();
    const taskId = `${dayName}_${stringIndex}`;
    return {
      taskId,
      status: false,
      index: stringIndex,
      day: dayName,
    };
  });

  return statusArray;
};

export const createWeekStatus = (taskData: WeekTaskData) => {
  const mondayTaskStatus = createDayTaskStatus("monday", taskData.monday);
  const tuesdayTaskStatus = createDayTaskStatus("tuesday", taskData.tuesday);
  const wednesdayTaskStatus = createDayTaskStatus(
    "wednesday",
    taskData.wednesday
  );
  const thursdayTaskStatus = createDayTaskStatus("thursday", taskData.thursday);
  const fridayTaskStatus = createDayTaskStatus("friday", taskData.friday);

  const allTaskStatus = [
    ...mondayTaskStatus,
    ...tuesdayTaskStatus,
    ...wednesdayTaskStatus,
    ...thursdayTaskStatus,
    ...fridayTaskStatus,
  ];

  const statusObject = allTaskStatus.reduce(
    (acc, task) => ({
      ...acc,
      [task.taskId]: task.status,
    }),
    {}
  );

  return statusObject;
};

export const getWeekplan = async (weekplanId: string | undefined) => {
  if (!weekplanId) {
    throw new Error("No weekplan id provided");
  }
  const weekplan = await db.weekplan.read(weekplanId);

  if (!weekplan) {
    throw new Error("Weekplan not found");
  }

  return weekplan;
};

export const makeWeekplan = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const testData = demoData;

  const newPlanID = await db.weekplan.create({
    title,
    tasks: allTasks,
    taskDay: {
      monday: testData.monday.map((task) => task.id),
      tuesday: testData.tuesday.map((task) => task.id),
      wednesday: testData.wednesday.map((task) => task.id),
      thursday: testData.thursday.map((task) => task.id),
      friday: testData.friday.map((task) => task.id),
    },
    description: description,
  });

  return newPlanID;
};

export const calculateWeekplanStatus = (weekplan: WeekPlan) => {};
