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
import {
  DateRangeField
} from "~/components/forms/date-picker";
import { performMutation } from 'remix-forms'
import { CreateWeekplanSchema, createWeekPlan } from "~/lib/database/weekplan/domain-funcs";
import { SelectField } from "~/components/forms/select-field";
import { makeServiceListWeekPlan } from "~/lib/database/service-lists/domain-function";
import { servicePeriodToDbModel } from "~/lib/database/service-periods/service-periods-crud.server";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const weekPlans = await db.weekplan.getAll();
  const servicePeriods = await db.service_period.getAll();

  const service_period_options = servicePeriods.map((servicePeriod) => {
    return {
      label: servicePeriod.name,
      value: servicePeriod.id
    }
  })

  const sectionText = {
    header: "Weekly Plans",
    description: "Weekly plans guide staff through all of the tasks that need to be completed each week in order to implement the program."
  }

  return json({ weekPlans, sectionText, service_period_options });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const clone = request.clone();
  const cloneData = await clone.formData();
  const servicePeriodId = cloneData.get('servicePeriod') as string;
  const service_period = await db.service_period.read(servicePeriodId);

  if (!service_period) {
    throw new Error("Service Period not found");
  }

  const result = await performMutation({
    request,
    schema: CreateWeekplanSchema,
    mutation: createWeekPlan,
  });

  if (!result.success) {
    return json(result, { status: 400 });
  }



  const serviceListID = makeServiceListWeekPlan({
    data: {
      service_period_id: servicePeriodId,
      name: result.data.values.title,
      description: "Food Box-" + result.data.description,
      seats_array: [],
      service_period: servicePeriodToDbModel(service_period),
      service_type: "FoodBoxOrder",
      service_items: [],
    },
    weekplanId: result.data.newPlanID
  });



  return redirect(`/weekplans/${result.data.newPlanID}`);
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
              <SelectField
                id="servicePeriod"
                label="Service Period"
                selectOptions={data.service_period_options}
                placeholder="Select Service Period"
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


