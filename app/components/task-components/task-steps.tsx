/* eslint-disable no-extra-semi */
import { useParams } from "@remix-run/react";

import { DialogFormSingleNumberInput, DialogFormSingleTextInput } from "../forms/dialog-form";
import { AddAllFamilies } from "./add-all-families";


function CheckOutTruck({ dataEntry }: { errors: Record<string, string[]>, dataEntry: Record<string, string | number> }) {

  const params = useParams();
  const weekplanId = params.weekplanId as string
  const taskId = params.taskId as string



  const currentOdometer = dataEntry["checkout-truck"] ?? 0



  const submitUrl = `/weekplans/${weekplanId}/task/${taskId}/number`

  return (
    <div className="py-4 ">

      <DialogFormSingleNumberInput
        label="Odometer2"
        title="Enter Odometer on Truck fetcher"
        description="Enter the current odometer reading on the truck."
        defaultNumber={currentOdometer as number}
        submitUrl={submitUrl}
      />


    </div>
  )
}

export type DriveStatus = "not-started" | "in-progress" | "completed" | "error" | "canceled"

function DriveSecondHarvest() {

  return (
    <div className="py-4">
      <iframe title="map to harvest" className="my-3 aspect-square min-w-full" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d260609.8246677232!2d-80.33177336869866!3d36.01134875666099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88530a587631e067%3A0xd80fc5d0a6bcdbb1!2sCommunities%20In%20Schools%20of%20Thomasville%2C%20East%20Guilford%20Street%2C%20Thomasville%2C%20NC%2C%20USA!3m2!1d35.8848546!2d-80.0811739!4m5!1s0x8853af6a6ba8891f%3A0x20fce3b69c5e8c07!2sSecond%20Harvest%20Food%20Bank%20of%20Northwest%20North%20Carolina%2C%203330%20Shorefair%20Dr%20NW%2C%20Winston-Salem%2C%20NC%2027105%2C%20United%20States!3m2!1d36.13607!2d-80.25279019999999!5e1!3m2!1sen!2sco!4v1713976745359!5m2!1sen!2sco" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="mt-4">

      </div>
    </div>
  )
}
function DriveCisT() {

  return (
    <div className="py-4">

      <iframe title="Drive to CIS" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12930.159675183502!2d-80.0811344!3d35.8847901!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88530a587631e067%3A0xd80fc5d0a6bcdbb1!2sCommunities%20In%20Schools%20of%20Thomasville!5e0!3m2!1sen!2sus!4v1715376982911!5m2!1sen!2sus" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}


function AcceptOrder() {



  return <div className="py-4">

  </div>

}


function OffloadColdPallets() {
  return <div className="py-4">
    <div className="aspect-video">
      {/* @tslint expect-error */}
      <iframe className="h-full w-full rounded-lg"
        src="https://www.youtube-nocookie.com/embed/S5TpiNRgQs4?si=hS-ucAYnGBNgMNIV" title="YouTube video player" frameBorder="0" allow="accelerometer;   clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  </div>
}
function OffloadToStagingArea() {
  return <div className="py-4">

  </div>
};
function MoveToStorage() {

  return <div className="py-4">

  </div>
};
function MessageFamilies({ dataEntry }: { dataEntry: Record<string, string | number> }) {
  const params = useParams();
  const weekplanId = params.weekplanId as string
  const taskId = params.taskId as string

  const messageText = dataEntry[taskId] ?? "Hello, we are preparing boxes for this week. Please reserve a time to pick up your box."


  return <div className="py-4">
    <p className="py-2">
      <span className="font-semibold">Current Message: </span>{messageText}
    </p>

    <DialogFormSingleTextInput
      label="Message to Families"
      title="Send Message to Families"
      description="Enter the message to send to families."
      defaultText={messageText as string}
      submitUrl={`/weekplans/${weekplanId}/task/${taskId}/text`}
      textarea={true}
    />
  </div>
};
function PrepareInventory() {

  return <div className="py-4">

  </div>
};
function PlanServiceMenu() {



  return <div className="py-4">




  </div>
};
function PlaceOrder() {


  return <div className="py-4">

  </div>
};
function ReserveTruck() {



  return <div className="py-4">

  </div>
};
function PrepareColdItems() {

  return <div className="py-4">

  </div>
};
function StageDryGoods() {



  return <div className="py-4">
  </div>
};
function PrepareInPersonPickup() {



  return <div className="py-4">
  </div>
};
function BuildDeliveryBoxes() {


  return <div className="py-4">
  </div>
};
function TakeSamplePicture() {



  return <div className="py-4">
  </div>
};
function SealDeliveryBoxes() {


  return <div className="py-4">

  </div>
};
function RequestDoorDash() {

  return <div className="py-4">
  </div>
};
function LoadDasherTrolley() {


  return <div className="py-4">
  </div>
};
function MeetDasher() {




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


function AddFamilies() {



  return <div className="py-4">
    <AddAllFamilies />
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
      return <CheckOutTruck errors={errors} dataEntry={dataEntry} />
    case 'drive-second-harvest':
      return <DriveSecondHarvest />
    case 'accept-order':
      return <AcceptOrder />
    case 'drive-cis-t':
      return <DriveCisT />
    case 'unload-cold-pallets':
      return <OffloadColdPallets />
    case 'unload-to-staging':
      return <OffloadToStagingArea />
    case 'store-dry-goods':
      return <MoveToStorage />
    case 'send-message':
      return <MessageFamilies dataEntry={dataEntry} />
    case 'prepare-inventory':
      return <PrepareInventory />
    case 'plan-menu':
      return <PlanServiceMenu />
    case 'place-order':
      return <PlaceOrder />
    case 'reserve-truck':
      return <ReserveTruck />
    case 'prepare-cold-items':
      return <PrepareColdItems />
    case 'stage-dry-goods':
      return <StageDryGoods />
    case 'prepare-pickup-orders':
      return <PrepareInPersonPickup />
    case 'build-boxes':
      return <BuildDeliveryBoxes />
    case 'take-box-photo':
      return <TakeSamplePicture />
    case 'seal-boxes':
      return <SealDeliveryBoxes />
    case 'request-doordash':
      return <RequestDoorDash />
    case 'load-trollies':
      return <LoadDasherTrolley />
    case 'meet-dashers':
      return <MeetDasher />
    case 'add-families':
      return <AddFamilies />
    default:
      return <div>Task not found</div>
  }

}