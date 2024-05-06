import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { DataTable } from "~/components/common/data-table";
import { weekPlanColumns } from "~/lib/database/weekplan/tables";
import { protectedRoute } from "~/lib/auth/auth.server";
import { db } from "~/lib/database/firestore.server";
import SectionHeaderDescription from "~/components/shell/section-headers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const weekPlans = await db.weekplan.getAll();

  const sectionText = {
    header: "Weekly Plans",
    description: "Weekly plans guide staff through all of the tasks that need to be completed each week in order to implement the program."
  }

  return json({ weekPlans, sectionText });
};






export default function WeekPlanIndex() {
  const data = useLoaderData<typeof loader>();

  return <div>
    <SectionHeaderDescription
      header={data.sectionText.header}
      description={data.sectionText.description}
    />
    <DataTable columns={weekPlanColumns} data={data.weekPlans} />
  </div>

}


