export interface BoardType {
  id: string;
  name: string;
  // createdAt: Date;
  columns: string[];
  items: ItemType[];
  // accountId: string;
}

export interface ColumnType {
  id: string;
  name: string;
  order: number;
  items: ItemType[];
  boardId: string;
}

export interface ItemType {
  id: string;
  title: string;
  content?: string;

  // we split the difference between the prev/next items. If an item is dropped
  // between 1.00 and 2.00 it will be 1.50. If dropped between 1.50 and 2.00 it
  // will be 1.75, etc.
  // order Float

  // Column   Column @relation(fields: [columnId], references: [id], onDelete: Cascade)
  // columnId String

  // Board   Board @relation(fields: [boardId], references: [id], onDelete: Cascade)
  // boardId Int
}
