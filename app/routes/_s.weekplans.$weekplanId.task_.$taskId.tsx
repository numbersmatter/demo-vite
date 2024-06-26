import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react"
import { loader as weekplanLoader } from "~/routes/_s.weekplans.$weekplanId";
import invariant from "tiny-invariant";
import { protectedRoute } from "~/lib/auth/auth.server";
import { performMutation } from "remix-forms";
import { ToggleCompleteSchema, findTaskDay, markTaskCompleteMutation } from "~/lib/database/weekplan/domain-funcs";
import { Button } from "~/components/ui/button";
import { getAction } from "~/lib/utils";
import { db } from "~/lib/database/firestore.server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { DayTasks } from "~/components/task-components/task-steps";
import { addAllSeatsMutation, addAllSeatsSchema } from "~/lib/database/service-lists/domain-function";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "no-Id";
  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    throw new Error("Weekplan not found");
  }
  const servicelist = await db.service_lists.read(weekplanId);
  if (!servicelist) {
    throw new Error("Service List not found");
  }
  const seats = await db.seats.queryByString("service_period_id", servicelist.service_period_id)

  const seatsNotAssigned = seats
    .filter(seat => !servicelist.seats_array.includes(seat.id))

  return json({ servicelist, seatsNotAssigned });
};



export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "";
  const action = await getAction(request);

  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    throw new Error("Weekplan not found");
  }
  const serviceList = await db.service_lists.read(weekplanId);
  if (!serviceList) {
    throw new Error("Service List not found");
  }
  const dayOfTask = findTaskDay(weekplan, params.taskId as string)
  if (!dayOfTask) {
    throw new Error("Task not found");
  }

  if (action === "toggleComplete") {
    const result = await performMutation({
      request,
      schema: ToggleCompleteSchema,
      mutation: markTaskCompleteMutation(weekplanId),
    })

    if (!result.success) {
      return json(result);
    }


    return redirect(`/weekplans/${weekplanId}/day/${dayOfTask}`);
  }
  if (action === "dataEntry") {
    const result = await performMutation({
      request,
      schema: ToggleCompleteSchema,
      mutation: markTaskCompleteMutation(weekplanId),
    })
  }

  if (action === "toDayPage") {
    return redirect(`/weekplans/${weekplanId}/day/${dayOfTask}`);
  }

  if (action === "addAllSeats") {
    const listId = weekplan.id;
    const service_period_id = serviceList.service_period_id;
    const result = await performMutation({
      request,
      schema: addAllSeatsSchema,
      mutation: addAllSeatsMutation(listId, service_period_id),
    })

    return json(result);
  }

  return json({ error: "Invalid action" }, { status: 400 });
};



export default function WeekPlanTask() {
  const loaderData = useLoaderData<typeof loader>();
  const params = useParams();
  const weekplanIdpath = "routes/_s.weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)

  invariant(data, "weekplan data not found")

  const defaultTask = {
    title: "Check Out Truck",
    description: "Enter the odometer reading for the truck.",
    id: "error-task"
  }

  interface TaskHelperText {
    [key: string]: string;
  }

  const currentTask = data.weekplan.tasks[params.taskId as string] ?? defaultTask

  const helperText = (data.taskHelperText as TaskHelperText)[currentTask.id] ?? ""

  const markValue = "complete"
  const dataEntry = data.weekplan.dataEntry


  return <div>
    <Card>
      <CardHeader>
        <CardTitle>
          {currentTask.title}
        </CardTitle>
        <CardDescription>
          {currentTask.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          helperText ? <p>{helperText}</p> : null
        }
        <DayTasks
          task_id={currentTask.id}
          taskStatus={{}}
          errors={{}}
          dataEntry={dataEntry}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Form method="post">
          <Button variant={"secondary"} name="_action" value="toDayPage" >
            Back To Day
          </Button>
        </Form>
        <Form method="post" className="flex py-4 justify-end">
          <input type="hidden" name="taskId" value={currentTask.id} />
          <input type="hidden" name="mark" value={markValue} />
          <Button name="_action" value="toggleComplete" type="submit">
            Mark Complete
          </Button>
        </Form>

      </CardFooter>
    </Card>
    <pre>{JSON.stringify(data.weekplan.dataEntry, null, 2)}</pre>
  </div>;
}



