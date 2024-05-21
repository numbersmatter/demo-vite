import { BoardType, ItemType } from "./data-types";

const getBoardData = async (weekplanId: string) => {
  return {
    name: "My Task Board",
    id: "board-id",
    items: [] as ItemType[],
    columns: [],
  } as BoardType;
};

export { getBoardData };
