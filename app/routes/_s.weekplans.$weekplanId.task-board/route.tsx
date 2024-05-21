import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getBoardData } from "./data-fetching";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { user } = await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "no-weekplan-id";
  const board = await getBoardData(weekplanId)
  return json({ board });
};



export default function TaskBoardRoute() {
  const data = useLoaderData<typeof loader>();
  return <div>
    <h1>Task Board</h1>
  </div>
}




