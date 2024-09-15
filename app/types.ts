export interface MaidanUser {
  Rating: 1 | 2 | 3 | 4 | 5;
  Activity: string;
  Names: string[];
  Organizations: string[];
  Reasons: string;
  Images: string[] | string;
  MainOrganization: string;
}

export type MaidanUserPropNameType =
  | "Rating"
  | "Names"
  | "Activity"
  | "Organizations"
  | "Reasons"
  | "Images"
  | "MainOrganization";

export const MaidanUserPropNames: Record<string, MaidanUserPropNameType> = {
  Майданутость: "Rating",
  ИзвестныеИмена: "Names",
  Активность: "Activity",
  Организации: "Organizations",
  Преступления: "Reasons",
  ИзвестныеИзображения: "Images",
  ГлавнаяОрганизация: "MainOrganization",
};

export interface MaidanOrganization {
  Rating: 1 | 2 | 3 | 4 | 5;
  Activity: string[];
  Names: string[];
}

export type MaidanOrganizationPropNameType =
  | "Rating"
  | "Names"
  | "Activity"
  | "MainOrganization";

export const MaidanOrganizationPropNames: Record<
  string,
  MaidanOrganizationPropNameType
> = {
  Майданутость: "Rating",
  Наименования: "Names",
  Активность: "Activity",
  ГлавнаяОрганизация: "MainOrganization",
};

export interface MaidanCount {
  Users: number;
  Organizations: number;
}
