import { getFirestore } from "firebase-admin/firestore";
import { db_paths, dataPoint } from "../firestore.server";

interface StaffDoc {
  fname: string;
  lname: string;
}

function staffToDBModel(staff: StaffDoc) {
  const { fname, lname } = staff;
  return {
    fname,
    lname,
  };
}

const staffConverter = <T>() => ({
  toFirestore: (data: StaffDoc) => staffToDBModel(data),
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const staff_collection = () =>
  getFirestore()
    .collection(db_paths.staff)
    .withConverter(staffConverter<StaffDoc>());

// const staff_collection = dataPoint<StaffDoc>(db_paths.staff);

const read = async (staff_id: string) => {
  const doc = await staff_collection().doc(staff_id).get();
  return doc.data();
};

export const staffDb = {
  read,
};
