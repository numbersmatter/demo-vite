import { Outlet } from "@remix-run/react";
import SectionHeaderDescription from "~/components/shell/section-headers";





export default function WeekPlan() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

      <Outlet />
    </div>
  );
}