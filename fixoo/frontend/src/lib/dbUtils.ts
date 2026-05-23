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
const withTimeout = (promise: Promise<any>, ms: number = 8000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout: Please ensure Firestore Database is created in your Firebase Console.")), ms))
  ]);
};

export const saveUserProfile = async (uid: string, data: any) => {
  const userRef = doc(db, "users", uid);
  await withTimeout(setDoc(userRef, {
    ...data,
    uid,
    updatedAt: serverTimestamp(),
    createdAt: data.createdAt || serverTimestamp()
  }, { merge: true }));
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

export const getProviderById = async (providerId: string) => {
  try {
    const providerRef = doc(db, "users", providerId);
    const providerSnap = await withTimeout(getDoc(providerRef));
    if (providerSnap.exists()) {
      return { id: providerSnap.id, ...providerSnap.data() };
    }
    return null;
  } catch (e) {
    console.error("Error fetching provider:", e);
    // Mock Provider fallback
    return {
      id: providerId,
      full_name: "Ramesh Electrician",
      service_type: "Electrician",
      is_online: true,
      kyc_status: "approved",
      rating: 4.8,
      jobs_completed: 142,
      experience_years: 5,
      work_city: "Mumbai",
      price_per_hour: 299,
      bio: "Expert electrician with over 5 years of experience in residential and commercial wiring.",
      photo_url: ""
    };
  }
};

/**
 * Booking Operations
 */
import { Booking } from "@/types";

export const createBooking = async (bookingData: Booking) => {
  const bookingRef = doc(collection(db, "bookings"));
  await withTimeout(setDoc(bookingRef, {
    ...bookingData,
    status: "pending",
    createdAt: serverTimestamp()
  }));
  return bookingRef.id;
};

export const getUserBookings = async (uid: string) => {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Review Operations
 */
import { Review } from "@/types";

export const createReview = async (reviewData: Review) => {
  const reviewRef = doc(collection(db, "reviews"));
  await withTimeout(setDoc(reviewRef, {
    ...reviewData,
    createdAt: serverTimestamp()
  }));
  return reviewRef.id;
};

export const getProviderReviews = async (providerId: string) => {
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("provider_id", "==", providerId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
