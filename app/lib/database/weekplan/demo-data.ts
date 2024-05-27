export interface DayTask {
  title: string;
  description: string;
  button_text: string;
  id: string;
  status?: boolean;
}
export interface WeekTaskData {
  monday: DayTask[];
  tuesday: DayTask[];
  wednesday: DayTask[];
  thursday: DayTask[];
  friday: DayTask[];
}

export interface WeekData {
  title: string;
  taskData: WeekTaskData;
  taskStatus: Record<string, boolean>;
}

const mondayTasks: DayTask[] = [
  {
    title: "Checkout Truck",
    description: "2:30 pm appointment",
    id: "checkout-truck",
    button_text: "Next",
  },
  {
    title: "Drive to Second Harvest",
    description: "40 minute drive to Second Harvest.",
    button_text: "Begin Drive",
    id: "drive-second-harvest",
  },
  {
    title: "Accept Food Pallets Order",
    description: "Sign for pallets",
    button_text: "Next",
    id: "accept-order",
  },
  {
    title: "Drive to CIS-T",
    description: "40 minute drive to CIS-T",
    button_text: "Begin Drive",
    id: "drive-cis-t",
  },
  {
    title: "Unload Cold Pallets",
    description: "Unload cold items to cold storage.",
    button_text: "Next",
    id: "unload-cold-pallets",
  },
  {
    title: "Unload to Staging Area",
    description: "Unload the Dry Goods to the staging area",
    button_text: "Next",
    id: "unload-to-staging",
  },
];

const tuesdayTasks: DayTask[] = [
  {
    title: "Move Dry Goods to Storage",
    description: "Move the dry goods to the storage area.",
    button_text: "Next",
    id: "store-dry-goods",
  },
  {
    title: "Send Message to Family",
    description: "Send link to family for food pickup.",
    button_text: "Next",
    id: "send-message",
  },
  {
    title: "Add Delivery Families",
    description: "Add families to delivery list.",
    button_text: "Next",
    id: "add-families",
  },
  {
    title: "Prepare Inventory",
    description: "Time permitting do inventory.",
    button_text: "Next",
    id: "prepare-inventory",
  },
  {
    title: "Plan Menu Items",
    description: "Plan items for Delivery.",
    button_text: "Next",
    id: "plan-menu",
  },
  {
    title: "Place Second Harvest Order",
    description: "Next Week's Order",
    button_text: "Next",
    id: "place-order",
  },
  {
    title: "Reserve Truck",
    description: "Reserve the truck for next week.",
    button_text: "Next",
    id: "reserve-truck",
  },
];

const wednesdayTasks: DayTask[] = [
  {
    title: "Prepare Cold Food Items",
    description: "Move the designated freezers.",
    button_text: "Next",
    id: "prepare-cold-items",
  },
  {
    title: "Stage Dry Goods",
    description: "Move Dry Goods to the staging area.",
    button_text: "Next",
    id: "stage-dry-goods",
  },
];

const thursdayTasks: DayTask[] = [
  {
    title: "Prepare Pickup Orders",
    description: "In-person pickup orders",
    button_text: "Next",
    id: "prepare-pickup-orders",
  },
  {
    title: "Build Boxes",
    description: "Build boxes with dry goods for delivery.",
    button_text: "Next",
    id: "build-boxes",
  },
];

const fridayTasks: DayTask[] = [
  {
    title: "Take Sample Photo",
    description: "Take a photo of items.",
    button_text: "Next",
    id: "take-box-photo",
  },
  {
    title: "Prepare Delivery Orders",
    description: "Final Prep for delivery.",
    button_text: "Next",
    id: "seal-boxes",
  },
  {
    title: "Request DoorDash",
    description: "Send Bulk Delivery request to DoorDash.",
    button_text: "Next",
    id: "request-doordash",
  },
  {
    title: "Prepare Dasher Orders",
    description: "Load trollies for delivery.",
    button_text: "Next",
    id: "load-trollies",
  },
  {
    title: "Meet Dashers",
    description: "Meet DoorDash Drivers.",
    button_text: "Next",
    id: "meet-dashers",
  },
];

export const demoData: WeekTaskData = {
  monday: mondayTasks,
  tuesday: tuesdayTasks,
  wednesday: wednesdayTasks,
  thursday: thursdayTasks,
  friday: fridayTasks,
};

export const allTasks = {
  "checkout-truck": {
    title: "Checkout Truck",
    description: "2:30 pm appointment",
    id: "checkout-truck",
  },
  "drive-second-harvest": {
    title: "Drive to Second Harvest",
    description: "40 minute drive to Second Harvest.",
    id: "drive-second-harvest",
  },
  "accept-order": {
    title: "Accept Food Pallets Order",
    description: "Sign for pallets",
    id: "accept-order",
  },
  "drive-cis-t": {
    title: "Drive to CIS-T",
    description: "40 minute drive to CIS-T",
    id: "drive-cis-t",
  },
  "unload-cold-pallets": {
    title: "Unload Cold Pallets",
    description: "Unload cold items to cold storage.",
    button_text: "Next",
    id: "unload-cold-pallets",
  },
  "unload-to-staging": {
    title: "Unload to Staging Area",
    description: "Unload the Dry Goods to the staging area",
    id: "unload-to-staging",
  },
  "store-dry-goods": {
    title: "Move Dry Goods to Storage",
    description: "Move the dry goods to the storage area.",
    id: "store-dry-goods",
  },
  "send-message": {
    title: "Send Message to Family",
    description: "Send link to family for food pickup.",
    id: "send-message",
  },
  "prepare-inventory": {
    title: "Prepare Inventory",
    description: "Time permitting do inventory.",
    id: "prepare-inventory",
  },
  "plan-menu": {
    title: "Plan Menu Items",
    description: "Plan items for Delivery.",
    id: "plan-menu",
  },
  "place-order": {
    title: "Place Second Harvest Order",
    description: "Next Week's Order",
    id: "place-order",
  },
  "reserve-truck": {
    title: "Reserve Truck",
    description: "Reserve the truck for next week.",
    id: "reserve-truck",
  },
  "prepare-cold-items": {
    title: "Prepare Cold Food Items",
    description: "Move the designated freezers.",
    id: "prepare-cold-items",
  },
  "stage-dry-goods": {
    title: "Stage Dry Goods",
    description: "Move Dry Goods to the staging area.",
    id: "stage-dry-goods",
  },
  "prepare-pickup-orders": {
    title: "Prepare Pickup Orders",
    description: "In-person pickup orders",
    id: "prepare-pickup-orders",
  },
  "build-boxes": {
    title: "Build Boxes",
    description: "Build boxes with dry goods for delivery.",
    id: "build-boxes",
  },
  "take-box-photo": {
    title: "Take Sample Photo",
    description: "Take a photo of items.",
    id: "take-box-photo",
  },
  "seal-boxes": {
    title: "Prepare Delivery Orders",
    description: "Final Prep for delivery.",
    id: "seal-boxes",
  },
  "request-doordash": {
    title: "Request DoorDash",
    description: "Send Bulk Delivery request to DoorDash.",
    id: "request-doordash",
  },
  "load-trollies": {
    title: "Prepare Dasher Orders",
    description: "Load trollies for delivery.",
    id: "load-trollies",
  },
  "meet-dashers": {
    title: "Meet Dashers",
    description: "Meet DoorDash Drivers.",
    id: "meet-dashers",
  },
  "add-families": {
    title: "Add Delivery Families",
    description: "Add families to delivery list.",
    id: "add-families",
  },
};

export const helperText = {
  "checkout-truck":
    "On Mondays you will need to pickup our weekly order of food from Second Harvest Food Bank. The address is 1234 Main St. and you will need to be there by 2:30pm. The Executive Director will have the keys for the truck in their office. When you have received the keys enter the Odometer reading in the form to complete the task.",
  "drive-second-harvest":
    "You will need to drive to Second Harvest Food Bank to pick up the weekly order of food. The address is 1234 Main St. and you will need to be there by 2:30pm.",
  "accept-order":
    "When you arrive at Second Harvest Food Bank you will need to sign for the pallets of food that we are receiving.",
  "drive-cis-t":
    "After you have received the pallets from Second Harvest you will need to drive to CIS-T to deliver the food.",
  "unload-cold-pallets":
    "When you arrive at CIS-T the most important task will be to move the the cold items to the cold storage area and should be done first.",
  "unload-to-staging":
    "After you have unloaded the cold items you can move the dry goods to the staging area.",
  "store-dry-goods":
    "Dry goods pallets can contain all sorts of items and will need to be sorted and stored in the storage area. Space is always at a premier in our storage area. We have a couple of general categories for dry goods: canned goods, prepared boxes,  cereals and breakfast items.",
  "send-message":
    "Every week we send a message to the families we serve letting them know they can request a food box for pickup.",
  "prepare-inventory":
    "If you have time you can do a quick inventory of the food items that you have received.",
  "plan-menu":
    "We try to have roughly similar items in each box. Our main limitation is this goal is what we receive from Second Harvest Food Bank. We don't always have 60 of one exact item in each box. So we try to substitute with similar items when necessary.",
  "place-order":
    "Place the order for next week's food delivery from Second Harvest. We place a weekly order from Second Harvest Food Bank. This order is placed on Tuesday for pickup the following Monday.",
  "reserve-truck":
    "Reserve the truck for next week's delivery. Reserve for the entire day.",
  "prepare-cold-items":
    "Cold food items need to be prepared for DoorDash and Drive-thru weeks. We prepare all the cold items on Wednesday and store them in the DoorDash Freezers until they are ready to be added as the final item in the box.",
  "stage-dry-goods":
    "Move the dry goods to the staging area for the delivery orders.",
  "prepare-pickup-orders": "Prepare the orders for the in-person pickups.",
  "build-boxes": "Build boxes with dry goods for delivery.",
  "take-box-photo": "Take a sample photo of the boxes that you are delivering.",
  "seal-boxes": "Prepare the delivery orders for the DoorDash drivers.",
  "request-doordash": "Send the bulk delivery request to DoorDash.",
  "load-trollies": "Load the trollies with the delivery orders.",
  "meet-dashers":
    "Meet the DoorDash drivers and give them the delivery orders.",
};
