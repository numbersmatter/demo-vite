import { json, type ActionFunctionArgs } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";

const addItemSchema = z.object({
  item_name: z.string().min(3).max(50),
  quantity: z.number(),
  value: z.number().min(1),
});


const addItem = makeDomainFunction(addItemSchema)(
  async (values) => {
    console.log(values);
    return { success: true };
  }
)


export const action = async ({ request, params }: ActionFunctionArgs) => {


  const result = await performMutation({
    request,
    schema: addItemSchema,
    mutation: addItem
  })



  return json({ result });
};
