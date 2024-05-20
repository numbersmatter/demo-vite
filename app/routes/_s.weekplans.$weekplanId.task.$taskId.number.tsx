import { json, type ActionFunctionArgs } from "@remix-run/node";
import { performMutation } from "remix-forms";
import { protectedRoute } from "~/lib/auth/auth.server";
import { confirmWeekPlanTaskExists, enterNumberData, enterTaskNumberData, numberSchema, } from "~/lib/database/weekplan/enter-task-data";



export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
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
    schema: numberSchema,
    mutation: enterNumberData(weekplanId, taskId),
  })

  return json({ result, checkPlanTaskExists });
};
