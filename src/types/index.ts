export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  group: string;
  focusArea?: string;
  photoUrl?: string;
  image?: string;
  order: number;
  email?: string;
  designation?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface EquipmentItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  quantity: number;
  available: boolean;
  photoUrl?: string;
  order: number;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time?: string;
  venue?: string;
  registrationLink?: string;
  published: boolean;
  order: number;
}

export interface CalendarEntry {
  _id: string;
  title: string;
  date: string;
  quarter: number;
  description?: string;
  type?: string;
  order: number;
}

export interface Registration {
  _id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  rollNoDept: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface ContactEnquiry {
  _id: string;
  name: string;
  rollNoDept: string;
  purpose: string;
  createdAt: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
