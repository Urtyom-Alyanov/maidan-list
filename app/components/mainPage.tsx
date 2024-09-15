"use client";

import { v7 } from "uuid";
import { MaidanCount, MaidanOrganization, MaidanUser } from "../types";
import { MainPageHeader } from "./mainPageHeader";
import { OrgDialog } from "./orgCard";
import { UserDialog } from "./userCard";

export const MainPage = ({
  count,
  currentView,
  orgs,
  users,
}: {
  count: MaidanCount;
  currentView: "users" | "orgs";
  search?: string;
  users: MaidanUser[];
  orgs: MaidanOrganization[];
}) => {
  return (
    <div className="w-full">
      <MainPageHeader count={count} view={currentView} />
      <div className="flex gap-2 justify-center max-w-full mt-5 flex-col sm:flex-row sm:flex-wrap">
        {users.map(user => {
          return <UserDialog key={v7()} {...user} />;
        })}
        {orgs.map(org => {
          return <OrgDialog key={v7()} {...org} />;
        })}
      </div>
    </div>
  );
};
