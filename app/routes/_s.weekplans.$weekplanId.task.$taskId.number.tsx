import { json, type ActionFunctionArgs } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { confirmWeekPlanTaskExists, enterTaskNumberData } from "~/lib/database/weekplan/enter-task-data";


const Schema = z.object({
  numberEntered: z.number(),
})

const domainFunc = (weekplanId: string, taskId: string) => makeDomainFunction(Schema)(
  async (values) => {

    return enterTaskNumberData({
      number: values.numberEntered,
      weekplanId: weekplanId,
      taskId: taskId,
    })
  }
)

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const weekplanId = params.weekplanId ?? "unknown";
  const taskId = params.taskId ?? "unknown";
  const checkPlanTaskExists = await confirmWeekPlanTaskExists(weekplanId, taskId);



  const result = await performMutation({
    request,
    schema: Schema,
    mutation: domainFunc(weekplanId, taskId),
  })

  return json({ result, checkPlanTaskExists });
};
