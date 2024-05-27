import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { DataTable } from "~/components/common/data-table";
import { serviceListItemsCols } from "~/lib/database/service-lists/tables";
import AddMenuItemDialog from "~/components/forms/add-menu-item";
import { protectedRoute } from "~/lib/auth/auth.server";
import { db } from "~/lib/database/firestore.server";
import { performMutation } from "remix-forms";
import { Button } from "~/components/ui/button";
import { addItemMutation, schemaAddItem, removeItemMutation, schemaRemoveItem } from "~/lib/database/service-lists/domain-function";
import { ToggleCompleteSchema, findTaskDay, markTaskCompleteMutation } from "~/lib/database/weekplan/domain-funcs";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const serviceListId = params.weekplanId ?? "no-id";

  const serviceList = await db.service_lists.read(serviceListId);
  if (!serviceList) {
    throw new Error("Service List not found");
  }

  const actionUrl = `/weekplans/${serviceListId}/task/plan-menu`;
  const markCompleteUrl = `/weekplans/${serviceListId}/task/plan-menu`;
  const markValue = "complete";

  return json({ serviceList, actionUrl, markCompleteUrl, markValue });
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const cloneRequest = request.clone();
  const formData = await cloneRequest.formData();
  const actionType = formData.get("actionType");
  const weekplanId = params.weekplanId ?? "no-id";
  const listID = weekplanId;

  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    throw new Error("Weekplan not found");
  }

  const dayOfTask = findTaskDay(weekplan, "plan-menu")
  if (!dayOfTask) {
    throw new Error("Task not found");
  }

  if (actionType === "addItem") {
    const result = await performMutation({
      request,
      schema: schemaAddItem,
      mutation: addItemMutation(listID)
    })
    return json({ result });
  }

  if (actionType === "removeItem") {
    const result = await performMutation({
      request,
      schema: schemaRemoveItem,
      mutation: removeItemMutation(listID)
    })
    return json({ result });
  }

  if (actionType === "toggleComplete") {
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


  const result = { success: false, errors: { message: ["Invalid action type"], item_name: [""], quantity: [""], value: [""] } };

  return json({ result });
};


export default function PlanMenu() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>
            Add the menu items for this service list.
          </CardDescription>
        </CardHeader>
        <DataTable
          columns={serviceListItemsCols}
          data={data.serviceList.service_items}
        />
        <div className="px-2 py-3">

          <AddMenuItemDialog actionUrl={data.actionUrl} />
        </div>
        <CardFooter className="py-2">
          <Form method="POST">
            <input type="hidden" name="taskId" value={"plan-menu"} />
            <input type="hidden" name="mark" value={data.markValue} />
            <Button name="actionType" value="toggleComplete" type="submit">
              Mark Complete
            </Button>
          </Form>
        </CardFooter>
      </Card>


      <pre>{JSON.stringify(data.serviceList, null, 2)} </pre>


    </div>
  )

}