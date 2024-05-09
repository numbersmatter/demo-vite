import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { TaskCard } from "~/components/task-components/mark-complete-card";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  return json({});
};



export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};



export default function WeekPlanTask() {
  const data = useLoaderData<typeof loader>();

  const task = {
    name: "Check Out Truck",
    description: "Enter the odometer reading for the truck."
  }


  return <div>
    <TaskCard task={task}>

    </TaskCard>
  </div>;
}



