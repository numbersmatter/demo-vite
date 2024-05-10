/* eslint-disable no-extra-semi */
import { Button } from "~/components/ui/button";
import { Form, useFetcher } from "@remix-run/react";
import { FormNumberField } from "~/components/forms/number-field";
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { DataTable } from "../common/data-table";


function CheckOutTruck({ taskComplete, errors, dataEntry }: { taskComplete: boolean, errors: Record<string, string[]>, dataEntry: Record<string, string | number> }) {
  const [open, setOpen] = useState(false)


  const odometerError = errors.odometer ? errors.odometer[0] : ""

  const currentOdometer = dataEntry.odometer ? dataEntry.odometer : 0

  return (
    <div className="py-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            Enter Odometer
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form method="POST" className="mx-auto w-full max-w-sm">
            <DialogHeader>
              <DialogTitle>
                Enter Odometer on Truck
              </DialogTitle>
              <DialogDescription>
                Enter the current odometer reading on the truck.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2 p-4">
              <FormNumberField
                label="Odometer" id="odometer"
                defaultValue={currentOdometer}
                error={odometerError}
              />

            </div>
            <DialogFooter className="pt-2 ">
              <Button type="submit" name="_action" value="dataEntry">
                Submit
              </Button>

            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export type DriveStatus = "not-started" | "in-progress" | "completed" | "error" | "canceled"

function DriveSecondHarvest({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();

  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }
  const handleMarkInComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: "incomplete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }


  const task = {
    name: "Drive to Second Harvest Food Bank",
    description: "Leave at 1:45pm"
  }

  const explainText = " The address is 3330 Shorefair Dr NW, Winston-Salem, NC 27105, United States and you will need to be there by 2:30pm. The recommended leave time is 1:45pm."

  const statusText = (status: DriveStatus) => {
    switch (status) {
      case "not-started":
        return "Drive not started"
      case "in-progress":
        return "Drive in progress"
      case "completed":
        return "Drive completed"
      case "error":
        return "Error"
      case "canceled":
        return "Drive canceled"
    }
  }

  return (
    <div className="py-4">
      <iframe title="map to harvest" className="my-3 aspect-square min-w-full" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d260609.8246677232!2d-80.33177336869866!3d36.01134875666099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88530a587631e067%3A0xd80fc5d0a6bcdbb1!2sCommunities%20In%20Schools%20of%20Thomasville%2C%20East%20Guilford%20Street%2C%20Thomasville%2C%20NC%2C%20USA!3m2!1d35.8848546!2d-80.0811739!4m5!1s0x8853af6a6ba8891f%3A0x20fce3b69c5e8c07!2sSecond%20Harvest%20Food%20Bank%20of%20Northwest%20North%20Carolina%2C%203330%20Shorefair%20Dr%20NW%2C%20Winston-Salem%2C%20NC%2027105%2C%20United%20States!3m2!1d36.13607!2d-80.25279019999999!5e1!3m2!1sen!2sco!4v1713976745359!5m2!1sen!2sco" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="mt-4">

      </div>
    </div>
  )
}
function DriveCisT({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const [driveStatus, setDriveStatus] = useState<DriveStatus>("not-started")
  const setStatusFetcher = useFetcher();

  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
    setDriveStatus("completed")
  }
  const handleMarkInComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: "incomplete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }


  const task = {
    name: "Drive to Communities In Schools",
    description: "Drive back to CIS-T."
  }

  const explainText = " The address is  19 East Guilford Street, Thomasville, NC 27360."

  const statusText = (status: DriveStatus) => {
    switch (status) {
      case "not-started":
        return "Drive not started"
      case "in-progress":
        return "Drive in progress"
      case "completed":
        return "Drive completed"
      case "error":
        return "Error"
      case "canceled":
        return "Drive canceled"
    }
  }

  return (
    <div className="py-4">

      <iframe title="Drive to CIS" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12930.159675183502!2d-80.0811344!3d35.8847901!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88530a587631e067%3A0xd80fc5d0a6bcdbb1!2sCommunities%20In%20Schools%20of%20Thomasville!5e0!3m2!1sen!2sus!4v1715376982911!5m2!1sen!2sus" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}


function AcceptOrder({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const inputFile = useRef(null);
  const task = {
    name: "Accept Order",
    description: "Signing for pallets and inspecting order."
  }
  const setStatusFetcher = useFetcher();

  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }


  const explainText = "When you arrive at Second Harvest Food Bank you will need to sign for the pallets and inspect the order. After signing for the order use your phone to take a picture of the order and upload it here."



  return <div className="py-4">

  </div>

}


function OffloadColdPallets({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();
  return <div className="py-4">
    <div className="aspect-video">
      {/* @tslint expect-error */}
      <iframe className="h-full w-full rounded-lg"
        src="https://www.youtube-nocookie.com/embed/S5TpiNRgQs4?si=hS-ucAYnGBNgMNIV" title="YouTube video player" frameBorder="0" allow="accelerometer;   clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  </div>
}
function OffloadToStagingArea({ taskComplete }: { taskComplete: boolean }) {
  return <div className="py-4">

  </div>
};
function MoveToStorage({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Move to Storage",
    description: "Move dry goods into their storage area."
  }

  const explainText = "Space is always at a premier in our storage area. We have a couple of general categories for dry goods: canned goods, prepared boxes,  cereals and breakfast items."

  return <div className="py-4">

  </div>
};
function MessageFamilies({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Send Message to Families",
    description: "Allows families to reserve a time for food pickup."
  }

  const explainText = "We do not have the resources to deliver all food boxes via DoorDash. For families not on DoorDash delivery we send them a message telling them how to reserve a time to pickup their box."

  return <div className="py-4">

    <div className="mt-4">

    </div>
  </div>
};
function PrepareInventory({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Prepare Inventory",
    description: "Time permitting do inventory of possible items."
  }

  const explainText = "Inventory is done solely for the purposes of filling out this weeks order requests. We do not have the resources to do a full inventory of all items. On DoorDash only weeks we need to have about 70 boxes of food prepared. On Drive-thru weeks we need about 150 boxes of food prepared."

  return <div className="py-4">

  </div>
};
function PlanServiceMenu({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Plan Service Menu",
    description: "The menu of items that will be sent in each box."
  }

  const explainText = "We try to have roughly similar items in each box. Our main limitation is this goal is what we receive from Second Harvest Food Bank. We don't always have 60 of one exact item in each box. So we try to substitute with similar items when necessary."

  return <div className="py-4">


    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
        <CardDescription>
          Add the menu items for this service list.
        </CardDescription>
      </CardHeader>
      <DataTable
        columns={[]}
        data={[]}
      />
      <CardFooter className="py-2">
        {/* <AddMenuItemDialog actionUrl={""} /> */}
      </CardFooter>
    </Card>

  </div>
};
function PlaceOrder({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Order from Second Harvest",
    description: "Place next week's order."
  }

  const explainText = "We place a weekly order from Second Harvest Food Bank. This order is placed on Tuesday for pickup the following Monday."

  return <div className="py-4">

  </div>
};
function ReserveTruck({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }



  return <div className="py-4">

  </div>
};
function PrepareColdItems({ taskComplete }: { taskComplete: boolean }) {

  return <div className="py-4">

  </div>
};
function StageDryGoods({ taskComplete }: { taskComplete: boolean }) {

  const explainText = "After cold food items are prepared, we move the nonperishable items which will go into the box to the staging area. This is done on Wednesday and Thursday."

  return <div className="py-4">
  </div>
};
function PrepareInPersonPickup({ taskComplete }: { taskComplete: boolean }) {

  const explainText = "All of the families that requested an in-person pickup time from the message sent out on Tuesday will be arriving today. Prepare those boxes of the pickup time."

  return <div className="py-4">
  </div>
};
function BuildDeliveryBoxes({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const explainText = "We have a set number of boxes that need to be built for DoorDash orders. These boxes are built on Thursday. The boxes are built with the non-perishable items for that box."

  return <div className="py-4">
  </div>
};
function TakeSamplePicture({ taskComplete }: { taskComplete: boolean }) {

  const explainText = "We send a picture of the box items to the families that are receiving the boxes. This is done on Friday morning and lets the family know what to expect in their box aswell as serves as a reminder to the family to expect a delivery."

  return <div className="py-4">
  </div>
};
function SealDeliveryBoxes({ taskComplete }: { taskComplete: boolean }) {
  const explainText = "The final step in preparing the boxes is to add the frozen items and seal the boxes. This is done on Friday morning. The boxes are then ready for delivery."

  return <div className="py-4">

  </div>
};
function RequestDoorDash({ taskComplete }: { taskComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }


  const explainText = "Bulk DoorDash Delivery needs to be scheduled 1 hour prior to the first pickups. This is done on Friday morning. The DoorDash driver will arrive at noon if the request is made by 11 am."

  return <div className="py-4">
  </div>
};
function LoadDasherTrolley({ taskComplete }: { taskComplete: boolean }) {
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Load Box Trollies",
    description: "Prepare boxes for each dasher."
  }

  const explainText = "Dasher's will be assigned up to 10 boxes each. The boxes are loaded onto the trollies and the dashers are given their delivery routes by DoorDash."

  return <div className="py-4">
  </div>
};
function MeetDasher({ taskComplete }: { taskComplete: boolean }) {
  const setStatusFetcher = useFetcher();
  const handleMarkComplete = async () => {
    await setStatusFetcher.submit(
      {
        newStatus: taskComplete ? "incomplete" : "complete",
        _action: "setTaskStatus"
      },
      {
        method: "post",
      })
  }

  const task = {
    name: "Meet Dashers",
    description: "Meet with the DoorDash drivers."
  }

  const explainText = "Verifer Dasher's name and total number of deliveries. Hand out the trolley and delivery route. Answer any questions the Dasher may have."

  return <div className="py-4">
    <div className="aspect-video">
      {/* @tslint expect-error */}
      <video
        className="h-full w-full rounded-lg"
        controls
      >
        <source src="https://www.youtube.com/embed/cRvVfjc1f-g?si=fze7PjHWR37_lk9l" type="video/mp4" />
        <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
      </video>
      {/* <iframe className="h-full w-full rounded-lg"
            src="https://www.youtube-nocookie.com/embed/cRvVfjc1f-g?si=l5Du3Jx3xPmLmKxw" title="YouTube video player" frameBorder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
    </div>
  </div>
};



export function DayTasks({
  task_id, taskStatus, errors, dataEntry
}: {
  task_id: string,
  taskStatus: { [key: string]: boolean },
  errors: Record<string, string[]>,
  dataEntry: Record<string, string | number>
}) {

  const taskComplete = taskStatus[task_id] ?? false;

  switch (task_id) {
    case 'checkout-truck':
      return <CheckOutTruck taskComplete={taskComplete} errors={errors} dataEntry={dataEntry} />
    case 'drive-second-harvest':
      return <DriveSecondHarvest taskComplete={taskComplete} />
    case 'accept-order':
      return <AcceptOrder taskComplete={taskComplete} />
    case 'drive-cis-t':
      return <DriveCisT taskComplete={taskComplete} />
    case 'unload-cold-pallets':
      return <OffloadColdPallets taskComplete={taskComplete} />
    case 'unload-to-staging':
      return <OffloadToStagingArea taskComplete={taskComplete} />
    case 'store-dry-goods':
      return <MoveToStorage taskComplete={taskComplete} />
    case 'send-message':
      return <MessageFamilies taskComplete={taskComplete} />
    case 'prepare-inventory':
      return <PrepareInventory taskComplete={taskComplete} />
    case 'plan-menu':
      return <PlanServiceMenu taskComplete={taskComplete} />
    case 'place-order':
      return <PlaceOrder taskComplete={taskComplete} />
    case 'reserve-truck':
      return <ReserveTruck taskComplete={taskComplete} />
    case 'prepare-cold-items':
      return <PrepareColdItems taskComplete={taskComplete} />
    case 'stage-dry-goods':
      return <StageDryGoods taskComplete={taskComplete} />
    case 'prepare-pickup-orders':
      return <PrepareInPersonPickup taskComplete={taskComplete} />
    case 'build-boxes':
      return <BuildDeliveryBoxes taskComplete={taskComplete} />
    case 'take-box-photo':
      return <TakeSamplePicture taskComplete={taskComplete} />
    case 'seal-boxes':
      return <SealDeliveryBoxes taskComplete={taskComplete} />
    case 'request-doordash':
      return <RequestDoorDash taskComplete={taskComplete} />
    case 'load-trollies':
      return <LoadDasherTrolley taskComplete={taskComplete} />
    case 'meet-dashers':
      return <MeetDasher taskComplete={taskComplete} />
    default:
      return <div>Task not found</div>
  }

}