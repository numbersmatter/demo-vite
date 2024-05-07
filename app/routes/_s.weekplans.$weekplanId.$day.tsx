import { useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { WeeklyTabs } from "~/components/shell/weektabs";
import { loader as weekplanLoader } from "~/routes/_s.weekplans.$weekplanId";




export default function WeekPlanIdDayRoute() {

  const weekplanIdpath = "routes/_s.weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const weekplan = data?.weekplan
  invariant(weekplan, "weekplan not found")


  return (
    <div>
      {/* <WeeklyTabs 
        tabs={[]}
      /> */}
    </div>
  );
}