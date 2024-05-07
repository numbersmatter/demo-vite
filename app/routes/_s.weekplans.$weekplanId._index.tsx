import type { ActionFunctionArgs } from "@remix-run/node";
import { useMatches, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getWeekplan } from "~/lib/database/weekplan/domain-funcs";
import { loader as weekplanLoader } from "~/routes/_s.weekplans.$weekplanId";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const weekplan = await getWeekplan(params.weekplanId);

  const taskDay = {
    monday: weekplan.taskData.monday.map((task) => task.id),
    tuesday: weekplan.taskData.tuesday.map((task) => task.id),
    wednesday: weekplan.taskData.wednesday.map((task) => task.id),
    thursday: weekplan.taskData.thursday.map((task) => task.id),
    friday: weekplan.taskData.friday.map((task) => task.id),
  }


  return null;
};



export default function WeekPlanIdIndexRoute() {
  const weekplanIdpath = "routes/_s.weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const weekplan = data?.weekplan
  invariant(weekplan, "weekplan not found")



  return <div className="py-3">
    <Card >
      <CardHeader>
        <CardTitle>Weekplan</CardTitle>
        <CardDescription>{data.weekplan.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Weeklyplan</p>
        <pre>{JSON.stringify(weekplanLoader, null, 2)}</pre>
      </CardContent>
      <CardFooter>
        <Button>Start Monday</Button>

      </CardFooter>

    </Card>
  </div>

}