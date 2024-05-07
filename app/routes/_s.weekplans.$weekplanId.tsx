import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import SectionHeaderDescription from "~/components/shell/section-headers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { db } from "~/lib/database/firestore.server";
import { getWeekplan } from "~/lib/database/weekplan/domain-funcs";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const weekplan = await getWeekplan(params.weekplanId);


  return json({ weekplan });
};


export default function WeekPlanIdRoute() {
  const data = useLoaderData<typeof loader>();

  return <div>
    <SectionHeaderDescription
      header={data.weekplan.title}
      description={data.weekplan.title}
    />
    <Outlet />
  </div>

}