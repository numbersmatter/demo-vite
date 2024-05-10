import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { DataTable } from "~/components/common/data-table";
import { weekPlanColumns } from "~/lib/database/weekplan/tables";
import { protectedRoute } from "~/lib/auth/auth.server";
import { db } from "~/lib/database/firestore.server";
import SectionHeaderDescription from "~/components/shell/section-headers";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { FormTextField } from "~/components/forms/textfield";
import { FormTextArea } from "~/components/forms/text-area";
import {
  DatePickerWithRange,
  DateRangeField
} from "~/components/forms/date-picker";
import { performMutation } from 'remix-forms'
import { CreateWeekplanSchema, createWeekPlan } from "~/lib/database/weekplan/domain-funcs";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const weekPlans = await db.weekplan.getAll();

  const sectionText = {
    header: "Weekly Plans",
    description: "Weekly plans guide staff through all of the tasks that need to be completed each week in order to implement the program."
  }

  return json({ weekPlans, sectionText });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);

  const result = await performMutation({
    request,
    schema: CreateWeekplanSchema,
    mutation: createWeekPlan,
  });

  if (!result.success) {
    return json(result, { status: 400 });
  }
  return redirect(`/weekplans/${result.data}`);
};





export default function WeekPlanIndex() {
  const data = useLoaderData<typeof loader>();

  return <div>
    <SectionHeaderDescription
      header={data.sectionText.header}
      description={data.sectionText.description}
    />
    <div className="py-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Create New Weekplan
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form method="post">
            <DialogHeader>
              <DialogTitle>Create New Weekplan</DialogTitle>
              <DialogDescription>
                This will create a new weekplan for the staff to follow.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormTextField id="title" label="Week Plan Title" />
              <DateRangeField
                label="Week Of"
                id="dateRange"
                className=""
                startDate={new Date()}
                rangeDays={5}
              />
            </div>
            <DialogFooter>
              <div className="w-full flex justify-between">
                <DialogClose>
                  cancel
                </DialogClose>
                <Button>
                  Create
                </Button>
              </div>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
    <DataTable columns={weekPlanColumns} data={data.weekPlans} />

  </div>

}


