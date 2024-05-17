import { json, type ActionFunctionArgs } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { confirmWeekPlanTaskExists, enterTaskTextData } from "~/lib/database/weekplan/enter-task-data";


const Schema = z.object({
  textEntered: z.string().min(3).max(300),
})

const domainFunc = (weekplanId: string, taskId: string) => makeDomainFunction(Schema)(
  async (values) => {

    return enterTaskTextData({
      text: values.textEntered,
      weekplanId: weekplanId,
      taskId: taskId,
    })
  }
)

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const weekplanId = params.weekplanId ?? "unknown";
  const taskId = params.taskId ?? "unknown";
  const checkPlanTaskExists = await confirmWeekPlanTaskExists(weekplanId, taskId);

  const noTaskError = `Task with Id ${taskId} does not exist in weekplan with Id ${weekplanId}`
  const noWeekPlanError = `Weekplan with ID:${weekplanId} not found`

  const noTaskResult = {
    success: false,
    errors: {
      "idError": [noTaskError]
    }
  }

  const noWeekPlanResult = {
    success: false,
    errors: {
      "idError": [noWeekPlanError]
    }
  }

  if (!checkPlanTaskExists.weekplan) {
    return json({ result: noWeekPlanResult }, { status: 404 });
  }
  if (!checkPlanTaskExists.task) {
    return json({ result: noTaskResult }, { status: 404 });
  }

  const result = await performMutation({
    request,
    schema: Schema,
    mutation: domainFunc(weekplanId, taskId),
  })

  return json({ result, checkPlanTaskExists });
};
