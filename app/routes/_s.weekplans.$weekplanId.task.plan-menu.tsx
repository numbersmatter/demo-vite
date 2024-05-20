import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
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




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const serviceListId = params.weekplanId ?? "no-id";

  const serviceList = await db.service_lists.read(serviceListId);
  if (!serviceList) {
    throw new Error("Service List not found");
  }

  const actionUrl = `/weekplans/${serviceListId}/task/plan-menu`;

  return json({ serviceList, actionUrl });
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const cloneRequest = request.clone();
  const formData = await cloneRequest.formData();
  const actionType = formData.get("actionType");
  const listID = params.weekplanId ?? "no-id";

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
          <Button variant="outline" type="button" >
            Next Step
          </Button>
        </CardFooter>
      </Card>


      <pre>{JSON.stringify(data.serviceList, null, 2)} </pre>


    </div>
  )

}