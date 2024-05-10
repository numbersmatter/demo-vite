import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firestore.server";
import { ServiceListAdd } from "./types";

export const makeServiceListWeekPlan = async ({
  data,
  weekplanId,
}: {
  data: ServiceListAdd;
  weekplanId: string;
}) => {
  const docData = {
    ...data,
    created_date: FieldValue.serverTimestamp(),
    updated_date: FieldValue.serverTimestamp(),
  };

  return await db.service_lists.makeServiceList({
    serviceListId: weekplanId,
    serviceList: docData,
  });
};
