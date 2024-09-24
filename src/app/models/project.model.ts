export interface Project {
  id: number;
  name: string;
  acronym: string;
  shortDescription: string;
  institution: string;
  partners: string[];
  timeframe: Timeframe;
  team: Team;
  budget: Budget;
  status: string;
  comments: Comment[];
}

export interface Timeframe {
  startDate: string; // Consider using Date type if you are working with date objects
  endDate: string;
}

export interface Team {
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
  hoursPerWeek: number;
}

export interface Budget {
  requestedSum: number;
  currency: string;
}

export interface Comment {
  userId: number;
  comment: string;
  date: string;
}
