import * as admin from "firebase-admin";
import { Collections } from "../Collections";
import { DbAdmin } from "@zm-blood-components/common";

export async function getAdmin(adminId: string) {
  const collection = admin.firestore().collection(Collections.ADMIN);
  const adminUser = await collection.doc(adminId).get();

  if (!adminUser.exists) {
    return undefined;
  }

  return adminUser.data() as DbAdmin;
}

export async function setAdmin(adminUser: DbAdmin) {
  const collection = admin.firestore().collection(Collections.ADMIN);
  await collection.doc(adminUser.id).set(adminUser);
}

export async function deleteAdmin(adminId: string) {
  const collection = admin.firestore().collection(Collections.ADMIN);
  await collection.doc(adminId).delete();
}
