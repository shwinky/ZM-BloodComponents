import firebase from "firebase";
// Hospital has available machines
// Admin opens new slots in app
// Donors sign up in slots - if they are allowed to
// Not MVP - Send notification to donor
// Donor completes donation

// Admin can see users (all of them?)
// Admin can make another user admin

export enum BloodType {
  O_PLUS,
  O_MINUS,
  A_PLUS,
  A_MINUS,
  B_PLUS,
  B_MINUS,
  AB_PLUS,
  AB_MINUS,
}

export type DbDonor = {
  id: string; // UUID generated by firebase
  phone: string;
  email: string;
  bloodType: BloodType;
};

export enum AdminRole {
  // App development team
  SYSTEM_USER = "SYSTEM_USER",

  // Can add new ZM coordinators
  // Can control app configurations
  ZM_MANAGER = "ZM_MANAGER",

  // Can see all users
  ZM_COORDINATOR = "ZM_COORDINATOR",

  // Can create new appointments for their hospital
  HOSPITAL_COORDINATOR = "HOSPITAL_COORDINATOR",
}

export type DbAdmin = {
  id: string; // UUID generated by firebase
  phone: string;
  email: string;
  roles: AdminRole[];
  hospitals?: Hospital[];
};

export enum Hospital {
  TEL_HASHOMER = "TEL_HASHOMER",
  ASAF_HAROFE = "ASAF_HAROFE",
}

export enum DonationType {
  Thrombocytes,
  Granulocytes,
}

export type DbAppointment = {
  // Slot + donor
  id?: string; // UUID
  // Pre-donor
  creationTime: firebase.firestore.Timestamp;
  creatorUserId: string;
  donationStartTime: firebase.firestore.Timestamp;
  hospital: Hospital;

  // added donor
  donorId?: string;
  bookingTime?: firebase.firestore.Timestamp;
  confirmationTime?: firebase.firestore.Timestamp; // Time donor confirmed they will come

  // post donation
};

export type AvailableAppointment = {
  id: string;
  donationStartTimeMillis: Date;
  hospital: Hospital;
};

export enum Collections {
  ADMIN = "admin",
  DONORS = "donors",
  APPOINTMENTS = "appointments",
}
