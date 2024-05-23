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



export function AddAllFamilies() {
  let fetcher = useFetcher();
  let [isOpen, setIsOpen] = useState(false);


  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Add All Families</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[550px]">
      <fetcher.Form method="post" action={""}>
        <DialogHeader>
          <DialogTitle>
            Add Families
          </DialogTitle>
          <DialogDescription>
            This action will add all families registered families in the service period to this service list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        </div>
        <DialogFooter>
          <Button name="_action" value="addAllSeats" type="submit">
            Add Service Families
          </Button>
        </DialogFooter>
      </fetcher.Form>
      {/* <pre>{JSON.stringify({ actionData, isFetching, isOpen }, null, 2)}</pre> */}
    </DialogContent>
  </Dialog>

}