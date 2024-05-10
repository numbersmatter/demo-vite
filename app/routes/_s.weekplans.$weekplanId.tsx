import { Link, Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import SectionHeaderDescription from "~/components/shell/section-headers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { calculateWeekplanStatus, getWeekplan } from "~/lib/database/weekplan/domain-funcs";
import { helperText } from "~/lib/database/weekplan/demo-data";
import { Button } from "~/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const weekplan = await getWeekplan(params.weekplanId);
  const taskStatus = calculateWeekplanStatus(weekplan);
  const taskHelperText = helperText;


  return json({ weekplan, taskStatus, taskHelperText });
};


export default function WeekPlanIdRoute() {
  const data = useLoaderData<typeof loader>();

  return <div>
    <SectionHeaderDescription
      header={data.weekplan.title}
      description={data.weekplan.title}
    />
    <div className="py-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/weekplans">Weekplans</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/weekplans/${data.weekplan.id}`}>
                {data.weekplan.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <Outlet />
    <div>

    </div>
  </div>

}