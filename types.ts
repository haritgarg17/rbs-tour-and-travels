
export interface Destination {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  price: number;
  category: 'Spiritual' | 'Adventure' | 'Cultural' | 'Coastal' | 'Mountains';
  rating: number;
  duration?: string;
  inclusions?: string[];
}

export interface ItineraryItem {
  day: number;
  activity: string;
  location: string;
}

export interface TripPlan {
  destination: string;
  duration: string;
  itinerary: ItineraryItem[];
  estimatedCost: string;
  tips: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
