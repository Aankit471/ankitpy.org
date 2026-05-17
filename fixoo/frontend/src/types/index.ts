export type ServiceType = 
  | "Plumber"
  | "Electrician"
  | "Carpenter"
  | "Cleaner"
  | "AC Repair"
  | "Appliance Repair"
  | "Cooking"
  | "Maid"
  | "Car Wash"
  | "Car Repair"
  | "Pest Control"
  | "Painter"
  | "CCTV Install";

export interface Booking {
  user_id?: string;
  provider_id?: string;
  service_type: ServiceType | string;
  status?: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  scheduled_date?: string;
  address: string;
  notes?: string;
  issue_image_url?: string;
  price?: number;
  payment_status?: "pending" | "paid" | "failed";
  payment_method?: "UPI" | "Card" | "COD" | "Wallet";
  is_urgent?: boolean;
  user_name?: string;
  user_phone?: string;
  createdAt?: any;
}

export interface Review {
  booking_id: string;
  user_id?: string;
  provider_id: string;
  rating: number;
  review_text?: string;
  user_name?: string;
  createdAt?: any;
}
