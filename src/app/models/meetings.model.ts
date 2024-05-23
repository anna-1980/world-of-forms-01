import { User } from "./user.model";

export interface Meeting {
  id: number;
  timeStamp: string;
  signments: Signment[];
  title: string;
  description: string;
  date: string;
  attendees: User[];
  location: string;
}

interface Signment {
  dataStamp: string;
  signingPerson: User;
  formData: string;
}