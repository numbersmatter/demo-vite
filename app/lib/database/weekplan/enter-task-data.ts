import { z } from "zod";
import { db } from "../firestore.server";
import { makeDomainFunction } from "domain-functions";

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

const numberSchema = z.object({
  numberEntered: z.number(),
});

const enterNumberData = (weekplanId: string, taskId: string) =>
  makeDomainFunction(numberSchema)(async (values) => {
    return enterTaskNumberData({
      number: values.numberEntered,
      weekplanId: weekplanId,
      taskId: taskId,
    });
  });

const confirmWeekPlanTaskExists = async (
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
const enterTaskNumberData = async (taskNumberEntry: TaskNumberEntry) => {
  const updateData = {
    [`dataEntry.${taskNumberEntry.taskId}`]: taskNumberEntry.number,
  };

  const writeData = await db.weekplan.update({
    weekplanId: taskNumberEntry.weekplanId,
    data: updateData,
  });

  return writeData;
};

const enterTaskTextData = async (taskTextEntry: TaskTextEntry) => {
  const updateData = {
    [`dataEntry.${taskTextEntry.taskId}`]: taskTextEntry.text,
  };

  const writeData = await db.weekplan.update({
    weekplanId: taskTextEntry.weekplanId,
    data: updateData,
  });

  return writeData;
};

const schemaEnterTextData = z.object({
  textEntered: z.string().min(3).max(300),
});

const enterTextData = (weekplanId: string, taskId: string) =>
  makeDomainFunction(schemaEnterTextData)(async (values) => {
    return enterTaskTextData({
      text: values.textEntered,
      weekplanId: weekplanId,
      taskId: taskId,
    });
  });

export {
  enterNumberData,
  numberSchema,
  confirmWeekPlanTaskExists,
  enterTaskNumberData,
  enterTaskTextData,
  enterTextData,
  schemaEnterTextData,
};
