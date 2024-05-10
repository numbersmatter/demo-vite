import { json, redirect, useLoaderData, useNavigate } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { SelectTab, Tab, WeeklyTabs } from "~/components/shell/weektabs";
import { loader as weekplanLoader } from "~/routes/_s.weekplans.$weekplanId";
import { protectedRoute } from "~/lib/auth/auth.server";
import { TaskStatus } from "~/lib/database/weekplan/domain-funcs";
import VerticalSteps, { Vstep } from "~/components/task-components/vertical-steps";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "";
  const day = params.day ?? "";
  const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  if (!validDays.includes(day)) {
    return redirect(`/weekplans/${weekplanId}`);
  }
  const tabs = validDays.map((d) => {
    return {
      id: d,
      name: d.charAt(0).toUpperCase() + d.slice(1),
      to: `/weekplans/${weekplanId}/day/${d}`,
      count: 0,
      current: d === day
    }
  })



  return json({ day, tabs });
};




export default function WeekPlanIdDayRoute() {
  const { day, tabs } = useLoaderData<typeof loader>();
  const weekplanIdpath = "routes/_s.weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const navigate = useNavigate();

  invariant(data, "weekplan data not found")
  const weekplan = data.weekplan
  const taskStatus = data.taskStatus as { [key: string]: TaskStatus };
  const taskDay = weekplan.taskDay as { [key: string]: string[] };
  const tasks = weekplan.tasks as { [key: string]: { id: string, description: string, title: string } };

  const dayStatusIncomplete = taskStatus[day].incomplete;

  const weekTabs = tabs.map((tab) => {
    return {
      name: tab.name,
      to: tab.to,
      count: taskStatus[tab.id].incomplete.length,
      current: tab.current
    }
  })
  const selectedTab = weekTabs.find((tab) => tab.current) ?? weekTabs[0];

  const handleTabChange = (tab: Tab) => {
    navigate(tab.to);
  }


  const taskSteps = taskDay[day].map((taskId) => {
    const task = tasks[taskId] ?? { title: "Error Title", description: "error description" };

    return {
      name: task.title,
      description: task.description,
      to: `/weekplans/${weekplan.id}/task/${task.id}`,
      status: dayStatusIncomplete.includes(task.id) ? 'upcoming' : 'complete',
      id: task.id
    } as Vstep
  })

  return (
    <div>
      <WeeklyTabs
        tabs={weekTabs}
        handleTabChange={handleTabChange}
      >
        <SelectTab
          tabs={weekTabs}
          handleTabChange={handleTabChange}
          selected={selectedTab}
        />
      </WeeklyTabs>
      <div className="max-w-sm mx-auto py-4 px-4 sm:px-6 lg:px-8">

        <VerticalSteps
          steps={taskSteps}
        />
      </div>
      <pre>{JSON.stringify(taskDay["monday"], null, 2)}</pre>
      <pre>{JSON.stringify(taskStatus, null, 2)}</pre>
    </div>
  );
}