import { json, type ActionFunctionArgs } from "@remix-run/node";



export const action = async ({ request, params }: ActionFunctionArgs) => {
  const weekplanId = params.weekplanId ?? "unknown";
  const taskId = params.taskId ?? "unknown";
  return json({
    message: "This is a placeholder for the number action function.",
    weekplanId,
    taskId,
  });
};
