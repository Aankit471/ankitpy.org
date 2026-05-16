import { db } from "./firebaseConfig";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

/**
 * User Profile Operations
 */
export const saveUserProfile = async (uid: string, data: any) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
    uid,
    updatedAt: serverTimestamp(),
    createdAt: data.createdAt || serverTimestamp()
  }, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

/**
 * Services Operations
 */
export const getServicesByCategory = async (category: string) => {
  const servicesRef = collection(db, "services");
  const q = query(servicesRef, where("category", "==", category));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllServices = async () => {
  const servicesRef = collection(db, "services");
  const querySnapshot = await getDocs(servicesRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Booking Operations
 */
export const createBooking = async (bookingData: any) => {
  const bookingRef = doc(collection(db, "bookings"));
  await setDoc(bookingRef, {
    ...bookingData,
    status: "pending",
    createdAt: serverTimestamp()
  });
  return bookingRef.id;
};

export const getUserBookings = async (uid: string) => {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
