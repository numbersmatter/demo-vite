import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useLoaderData, useRouteError, } from "@remix-run/react";
import { RouteError, StandardError } from "~/components/shell/page-error";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Food Box Program" },
    { name: "description", content: "Food Box Staff program app." },
  ];
};


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { user, staffData } = await protectedRoute(request);

  const email = user.email

  return json({ user, staffData, email });
};





export default function Index() {
  const data = useLoaderData<typeof loader>()


  return (
    <StaffShell >
      <div className="flex-1">

        <Outlet />
      </div>
      <div className=" h-16 bg-slate-400">

      </div>
    </StaffShell>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const test = error
    return <RouteError routeError={error} />
  }
  else if (error instanceof Error) {
    return (
      <StandardError error={error} />
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
