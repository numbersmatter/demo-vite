import { db } from "../firestore.server";

interface TaskNumberEntry {
  number: number;
  weekplanId: string;
  taskId: string;
  options?: {
    min: number;
    max: number;
  };
}

interface TaskTextEntry {
  text: string;
  weekplanId: string;
  taskId: string;
}

export const confirmWeekPlanTaskExists = async (
  weekplanId: string,
  taskId: string
) => {
  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    return {
      weekplan: false,
      task: false,
    };
  }

  const task = weekplan.tasks[taskId];
  if (!task) {
    return {
      weekplan: true,
      task: false,
    };
  }

  return {
    weekplan: true,
    task: true,
  };
};

export const enterTaskNumberData = async (taskNumberEntry: TaskNumberEntry) => {
  const updateData = {
    [`dataEntry.${taskNumberEntry.taskId}`]: taskNumberEntry.number,
  };

  const writeData = await db.weekplan.update({
    weekplanId: taskNumberEntry.weekplanId,
    data: updateData,
  });

  return writeData;
};

export const enterTaskTextData = async (taskTextEntry: TaskTextEntry) => {
  const updateData = {
    [`dataEntry.${taskTextEntry.taskId}`]: taskTextEntry.text,
  };

  const writeData = await db.weekplan.update({
    weekplanId: taskTextEntry.weekplanId,
    data: updateData,
  });

  return writeData;
};
