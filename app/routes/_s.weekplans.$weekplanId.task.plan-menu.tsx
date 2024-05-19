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
import { ItemLine } from "~/lib/database/service-lists/types";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
const schemaAddItem = z.object({
  item_name: z.string().min(3).max(50),
  quantity: z.coerce.number().positive().int(),
  value: z.coerce.number().positive().int(),
})

const addItemMutation = (service_list_id: string) => makeDomainFunction(schemaAddItem)(
  (async (values) => {

    const newItemLine: ItemLine = {
      item_name: values.item_name,
      quantity: values.quantity,
      value: values.value,
      item_id: "new-item-id"
    }

    await db.service_lists.addItem(service_list_id, newItemLine)


    return { status: "success", values }
  })
)


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
    return json(result);
  }

  return json({ message: "sumbitted to action" });
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
        <CardFooter className="py-2">
          <AddMenuItemDialog actionUrl={data.actionUrl} />
        </CardFooter>
      </Card>


      <pre>{JSON.stringify(data.serviceList, null, 2)} </pre>


    </div>
  )

}