import type { ActionFunctionArgs } from "@remix-run/node";
import { useMatches, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { protectedRoute } from "~/lib/auth/auth.server";
import { TaskStatus, calculateWeekplanStatus, getWeekplan } from "~/lib/database/weekplan/domain-funcs";
import { loader as weekplanLoader } from "~/routes/_s.weekplans.$weekplanId";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const weekplan = await getWeekplan(params.weekplanId);




  return null;
};



export default function WeekPlanIdIndexRoute() {
  const weekplanIdpath = "routes/_s.weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const weekplan = data?.weekplan
  invariant(weekplan, "weekplan not found")

  const taskStatus = data.taskStatus


  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];


  // const taskStatus = calculateWeekplanStatus(weekplan);

  return <div className="py-3">
    <Card >
      <CardHeader>
        <CardTitle>Weekplan</CardTitle>
        <CardDescription>
          {data.weekplan?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Weeklyplan</p>
        {
          days.map(day => {
            const dayTasks = taskStatus[day as keyof typeof taskStatus]
            return <div key={day} className="py-2">
              <h2>{day.toUpperCase()}</h2>
              <p>
                {dayTasks.incomplete.length} / {dayTasks.all.length} remaining

              </p>
            </div>
          })

        }

      </CardContent>
      <CardFooter>
        <Button>Start Monday</Button>

      </CardFooter>

    </Card>
  </div>

}