import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { FormTextField } from "./textfield"
import { FormNumberField } from "./number-field"
import { useFetcher } from "@remix-run/react";


export function DialogFormSingleNumberInput({
  label,
  title,
  description,
  defaultNumber,
  submitUrl,
}: {
  label: string,
  title: string,
  description: string,
  defaultNumber: number,
  submitUrl: string,
}) {
  const fetcher = useFetcher();

  return <Dialog>
    <DialogTrigger asChild>
      <Button>
        {title}
      </Button>
    </DialogTrigger>
    <DialogContent className="">
      <fetcher.Form action={submitUrl} method="POST" className="mx-auto w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormNumberField
            id="numberEntered"
            label={label}
            defaultValue={defaultNumber}
          />
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            <DialogClose>
              cancel
            </DialogClose>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </fetcher.Form>

    </DialogContent>
  </Dialog>
}


