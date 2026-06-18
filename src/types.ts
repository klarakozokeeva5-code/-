export type RoomClass = 'standard' | 'comfort' | 'luxe';

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  date: string;
  roomClass: RoomClass;
  days: number;
  guests: number;
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  age: number;
  location: string;
  text: string;
  rating: number;
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  icon: string;
  benefits: string;
}
