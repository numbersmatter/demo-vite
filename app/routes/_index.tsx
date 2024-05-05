import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, } from "@remix-run/react";
import { StaffShell } from "~/components/shell/staff-shell";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  return json({});
};





export default function Index() {
  const data = useLoaderData<typeof loader>()


  return (
    <StaffShell >
      <div className="flex-1">

        <Outlet />
      </div>
    </StaffShell>
  );
}
