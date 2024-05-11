import { z } from "zod";
import { db } from "../firestore.server";
import { allTasks, demoData } from "./demo-data";
import { DayTask, TaskDay, ValidDay, WeekPlan, WeekTaskData } from "./types";
import { makeDomainFunction } from "domain-functions";

const TaskCompleteSchema = z.object({
  "checkout-truck": z.coerce.number(),
  "drive-second-harvest": z.boolean(),
  "accept-order": z.boolean(),
  "drive-cis-t": z.boolean(),
  "unload-cold-pallets": z.boolean(),
  "unload-to-staging": z.boolean(),
  "store-dry-goods": z.boolean(),
  "send-message": z.boolean(),
  "prepare-inventory": z.boolean(),
  "plan-menu": z.boolean(),
  "place-order": z.boolean(),
  "reserve-truck": z.boolean(),
  "prepare-cold-items": z.boolean(),
  "stage-dry-goods": z.boolean(),
});

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
    taskEntry: {},
    description: description,
    dataEntry: {},
  });

  return newPlanID;
};

export const CreateWeekplanSchema = z.object({
  title: z.string(),
  dateRangefrom: z.string(),
  dateRangeto: z.string(),
});

export const createWeekPlan = makeDomainFunction(CreateWeekplanSchema)(
  async (values) => {
    const startDate = new Date(values.dateRangefrom).toLocaleDateString();
    const endDate = new Date(values.dateRangeto).toLocaleDateString();

    const description = `Week of ${startDate} - ${endDate}`;

    const newPlanID = await db.weekplan.create({
      title: values.title,
      tasks: allTasks,
      taskDay: {
        monday: demoData.monday.map((task) => task.id),
        tuesday: demoData.tuesday.map((task) => task.id),
        wednesday: demoData.wednesday.map((task) => task.id),
        thursday: demoData.thursday.map((task) => task.id),
        friday: demoData.friday.map((task) => task.id),
      },
      description: description,
      taskEntry: {},
      dataEntry: {},
    });

    return { newPlanID, values, description };
  }
);

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
export interface TaskStatus {
  incomplete: string[];
  all: string[];
}

export const calculateWeekplanStatus = (weekplan: WeekPlan) => {
  const taskEntry = weekplan.taskEntry;

  const mondayIncompleteTasks = weekplan.taskDay.monday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const tuesdayIncompleteTasks = weekplan.taskDay.tuesday.filter(
    (taskId) => !taskEntry[taskId]
  );

  const wednesdayIncompleteTasks = weekplan.taskDay.wednesday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const thursdayIncompleteTasks = weekplan.taskDay.thursday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const fridayIncompleteTasks = weekplan.taskDay.friday.filter(
    (taskId) => !taskEntry[taskId]
  );

  return {
    monday: {
      incomplete: mondayIncompleteTasks,
      all: weekplan.taskDay.monday,
    } as TaskStatus,
    tuesday: {
      incomplete: tuesdayIncompleteTasks,
      all: weekplan.taskDay.tuesday,
    } as TaskStatus,
    wednesday: {
      incomplete: wednesdayIncompleteTasks,
      all: weekplan.taskDay.wednesday,
    } as TaskStatus,
    thursday: {
      incomplete: thursdayIncompleteTasks,
      all: weekplan.taskDay.thursday,
    } as TaskStatus,
    friday: {
      incomplete: fridayIncompleteTasks,
      all: weekplan.taskDay.friday,
    } as TaskStatus,
  };
};

const toggleTaskComplete = async ({
  taskId,
  weekplanId,
  status,
}: {
  weekplanId: string;
  taskId: string;
  status: string;
}) => {
  if (status === "complete") {
    const updateData = {
      [`taskEntry.${taskId}`]: "complete",
    };
    return await db.weekplan.update({ weekplanId, data: updateData });
  }

  const updateData = {
    [`taskEntry.${taskId}`]: "",
  };
  return await db.weekplan.update({ weekplanId, data: updateData });
};

export const ToggleCompleteSchema = z.object({
  taskId: z.string(),
  mark: z.enum(["complete", "incomplete"]),
});

export const markTaskCompleteMutation = (weekplanId: string) =>
  makeDomainFunction(ToggleCompleteSchema)(async (values) => {
    return toggleTaskComplete({
      weekplanId,
      taskId: values.taskId,
      status: values.mark,
    });
  });

export const findTaskDay = (weekplan: WeekPlan, taskId: string) => {
  const taskDay = weekplan.taskDay;
  const day = days.find((day) =>
    taskDay[day as keyof TaskDay].includes(taskId)
  );
  return day;
};

export const recordDataEntry = async ({
  weekplanId,
  taskId,
  dataEntry,
}: {
  weekplanId: string;
  taskId: string;
  dataEntry: string;
}) => {
  const updateData = {
    [`dataEntry.${taskId}`]: dataEntry,
  };
  return await db.weekplan.update({ weekplanId, data: updateData });
};
