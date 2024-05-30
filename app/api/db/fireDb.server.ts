import { programsCollection } from "./collections/programs/programs-collections.server";

const basePath = "firestore";

const paths = {
  programs: `${basePath}/programs`,
  programAreas: `${basePath}/program_areas`,
};

export const firestoreDb = {
  programs: programsCollection(paths.programs),
};
