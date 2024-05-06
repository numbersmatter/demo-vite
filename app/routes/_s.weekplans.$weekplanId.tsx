import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import SectionHeaderDescription from "~/components/shell/section-headers";
import { protectedRoute } from "~/lib/auth/auth.server";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  return json({});
};


export default function WeekPlanIdRoute() {


  return <div>
    <SectionHeaderDescription
      header="Week of May 6th - 10th, 2024"
      description="This is a weekly plan"
    />
  </div>

}