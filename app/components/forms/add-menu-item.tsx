import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { useEffect, useState } from "react";
import { FormTextField } from "~/components/forms/textfield";
import { FormNumberField } from "~/components/forms/number-field";
import { action as invoiceAction } from "~/routes/_s.weekplans.$weekplanId.task.plan-menu"






export default function AddMenuItemDialog({ actionUrl }: { actionUrl: string }) {
  const fetcher = useFetcher<typeof invoiceAction>();
  const [isOpen, setIsOpen] = useState(false);
  const isFetching = fetcher.state !== "idle";

  const emptyErrors = {
    item_name: [""],
    quantity: [""],
    value: [""],
  }



  const actionData = fetcher.data;
  const result = actionData?.result ?? { success: false, errors: emptyErrors };


  useEffect(() => {
    if (result.success) {
      setIsOpen(false)
    }
  }, [result.success, isFetching])

  const errors = result.success
    ? emptyErrors
    : {
      item_name: result?.errors?.item_name ?? [""],
      quantity: result.errors?.quantity ?? [""],
      value: result.errors?.value ?? [""],
    };

  const displayError = {
    item_name: errors?.item_name[0],
    quantity: errors?.quantity[0],
    value: errors?.value[0],
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <fetcher.Form method="post" action={actionUrl}>
          <DialogHeader>
            <DialogTitle>
              Add Item
            </DialogTitle>
            <DialogDescription>
              Adds item to the service list menu.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormTextField
              id="item_name"
              label="Name"
              error={displayError.item_name}
            />
            <FormNumberField
              id="quantity"
              label="Quantity"
              error={displayError.quantity}
            />
            <FormNumberField
              id="value"
              label="Unit Value"
              error={displayError.value}
            />
          </div>
          <DialogFooter>
            <Button name="actionType" value="addItem" type="submit">Add Item</Button>
          </DialogFooter>
        </fetcher.Form>
        <pre>{JSON.stringify({ actionData, isFetching, isOpen }, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  )
}