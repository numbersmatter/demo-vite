import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firestore.server";
import { ServiceListAdd, ServiceListId } from "./types";
import { ItemLine } from "~/lib/database/service-lists/types";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";

const schemaAddItem = z.object({
  item_name: z.string().min(3).max(50),
  quantity: z.coerce.number().positive().int(),
  value: z.coerce.number().positive().int(),
});
const schemaRemoveItem = z.object({
  item_id: z.string().min(3).max(50),
  item_name: z.string().min(3).max(50),
  quantity: z.coerce.number().positive().int(),
  value: z.coerce.number().positive().int(),
});

const makeServiceListWeekPlan = async ({
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

const addItemMutation = (service_list_id: string) =>
  makeDomainFunction(schemaAddItem)(async (values) => {
    const newItemLine: ItemLine = {
      item_name: values.item_name,
      quantity: values.quantity,
      value: values.value,
      item_id: "new-item-id",
    };

    await db.service_lists.addItem(service_list_id, newItemLine);

    return { status: "success", values };
  });

const removeItemMutation = (service_list_id: string) =>
  makeDomainFunction(schemaRemoveItem)(async (values) => {
    const item = {
      item_name: values.item_name,
      quantity: values.quantity,
      value: values.value,
      item_id: values.item_id,
    };

    await db.service_lists.removeItem(service_list_id, item);

    return { status: "success", values };
  });

const seatMutSchema = z.object({
  seatID: z.string().length(20),
  actionType: z.enum(["addSeat", "removeSeat"]),
});

const addAllSeatsSchema = z.object({
  _action: z.enum(["addAllSeats"]),
});

const addMutation = (listId: ServiceListId) =>
  makeDomainFunction(seatMutSchema)(async ({ seatID }) => {
    const seat = await db.seats.read(seatID);
    if (!seat) {
      return {
        status: 404,
        message: "Seat not found",
      };
    }

    await db.service_lists.addSeat(listId, seatID);

    return {
      status: 200,
      message: "Seat added",
    };
  });
const removeMutation = (listId: ServiceListId) =>
  makeDomainFunction(seatMutSchema)(async ({ seatID }) => {
    const seat = await db.seats.read(seatID);
    if (!seat) {
      return {
        status: 404,
        message: "Seat not found",
      };
    }

    await db.service_lists.removeSeat(listId, seatID);

    return {
      status: 200,
      message: "Seat removed",
    };
  });

const addAllSeatsMutation = (
  listId: ServiceListId,
  service_period_id: string
) =>
  makeDomainFunction(addAllSeatsSchema)(async (values) => {
    const allSeats = await db.seats.queryByString(
      "service_period_id",
      service_period_id
    );
    const seatIDs = allSeats.map((seat) => seat.id);

    const addWrites = await db.service_lists.update(listId, {
      seats_array: seatIDs,
    });

    return {
      status: 200,
      message: "All Seats added",
    };
  });

export {
  makeServiceListWeekPlan,
  addItemMutation,
  removeItemMutation,
  schemaAddItem,
  schemaRemoveItem,
  addMutation,
  removeMutation,
  addAllSeatsMutation,
  addAllSeatsSchema,
  seatMutSchema,
};
