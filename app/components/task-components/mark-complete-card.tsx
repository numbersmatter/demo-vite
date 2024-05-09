import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"


export type Task = {
  name: string,
  description: string,
}

export function TaskCard({ task, children }: { task: Task, children?: React.ReactNode }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {task.name}
        </CardTitle>
        <CardDescription>
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="">
        <Button>Next</Button>
      </CardFooter>
    </Card>
  )
}


function CheckOutTruck({ taskComplete, errors, dataEntry }: { taskComplete: boolean, errors: Record<string, string[]>, dataEntry: Record<string, string | number> }) {



  const task = {
    name: "Check Out Truck",
    description: "Enter the odometer reading for the truck."
  }

  const truckText = "On Mondays you will need to pickup our weekly order of food from Second Harvest Food Bank. The address is 1234 Main St. and you will need to be there by 2:30pm. The Executive Director will have the keys for the truck in their office. When you have received the keys enter the Odometer reading in the form to complete the task."

  const odometerError = errors.odometer ? errors.odometer[0] : ""

  const currentOdometer = dataEntry.odometer ? dataEntry.odometer : 0

  return (
    <div className="py-4">
      <TaskCard
        task={task}
      >
        <p className="prose text-slate-600">
          {truckText}
        </p>
        <div className="mt-4">

        </div>
      </TaskCard>

    </div>
  )
}
