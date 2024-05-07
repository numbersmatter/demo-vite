export const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export type ValidDay = (typeof validDays)[number];

interface TaskStatus {
  [k: string]: boolean;
}

export interface DayTask {
  title: string;
  description: string;
  button_text: string;
  id: string;
}
export interface WeekTaskData {
  monday: DayTask[];
  tuesday: DayTask[];
  wednesday: DayTask[];
  thursday: DayTask[];
  friday: DayTask[];
}

interface TaskDay {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}
export interface WeekPlanBase {
  title: string;
  taskData: WeekTaskData;
  taskStatus: TaskStatus;
  tasks: { [key: string]: DayTask };
  taskDay: TaskDay;
  dataEntry?: Record<string, string | number>;
}

export interface WeekPlanDBModel extends WeekPlanBase {}

export interface WeekPlan extends WeekPlanBase {
  id: string;
}
