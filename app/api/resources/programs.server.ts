import { firestoreDb } from "../db/fireDb.server";

interface Program {
  id: string;
  program_area_id: string;
  name: string;
  criteria: string;
}

const exampleProgram: Program = {
  id: "box-delivery",
  program_area_id: "food-pantry",
  name: "Food Box Delivery",
  criteria:
    " High need families with children in the Thomasville School District.",
};

const getPrograms = async (programId: string) => {
  if (programId === "") {
    return firestoreDb.programs.getAll();
  }
  return firestoreDb.programs.read(programId);
};
