export interface MaidanUser {
  Rating: 1 | 2 | 3 | 4 | 5;
  Activity: string;
  Names: string[];
  Organizations: string[];
  Reasons: string;
  Images: string[] | string;
  MainOrganization: string;
}

export interface MaidanOrganization {
  Rating: 1 | 2 | 3 | 4 | 5;
  Activity: string[];
  Names: string[];
}

export interface MaidanCount {
  Users: number;
  Organizations: number;
}
