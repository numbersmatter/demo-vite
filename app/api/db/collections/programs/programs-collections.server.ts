import { getFirestore } from "firebase-admin/firestore";

interface ProgramFirestoreModel {
  program_area_id: string;
  program_area_name: string;
  name: string;
  criteria: string;
}

interface Program {
  id: string;
  program_area_id: string;
  program_area_name: string;
  name: string;
  criteria: string;
}

const programsToDbModel = (program: Program): ProgramFirestoreModel => {
  return {
    program_area_id: program.program_area_id,
    name: program.name,
    criteria: program.criteria,
    program_area_name: program.program_area_name,
  };
};

// program firebase converter
const programConverter = {
  toFirestore: programsToDbModel,
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      program_area_id: data.program_area,
      name: data.name,
      criteria: data.criteria,
      program_area_name: data.program_area_name,
    } as Program;
  },
};

export const programsCollection = (path: string) => {
  const programsCollection = getFirestore()
    .collection(path)
    .withConverter(programConverter);

  const create = async ({
    program,
    programId,
  }: {
    program: Program;
    programId?: string;
  }) => {
    if (programId) {
      await programsCollection.doc(programId).set(program);
      return programId;
    }
    const docRef = await programsCollection.add(program);
    return docRef.id;
  };

  const read = async (id: string) => {
    const docRef = await programsCollection.doc(id).get();
    return docRef.data();
  };

  const update = async (
    id: string,
    program: Partial<ProgramFirestoreModel>
  ) => {
    const writeResult = await programsCollection.doc(id).update(program);
    return {
      success: true,
      ...writeResult,
    };
  };

  const getAll = async () => {
    const snapshot = await programsCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  };

  return {
    create,
    read,
    update,
    getAll,
  };
};
