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
    id: "check-out-truck",
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
  {
    title: "End of Day",
    description: "End of the day",
    button_text: "End Day",
    id: "end-monday",
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
    id: "check-out-truck",
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
};
