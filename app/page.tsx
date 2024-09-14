import { promises as fs } from "fs";
import path from "path";
import { MainPage } from "./components/mainPage";
import { MaidanCount, MaidanOrganization, MaidanUser } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const users: MaidanUser[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/users.json"), "utf-8")
  );
  const count: MaidanCount = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/count.json"), "utf-8")
  );
  const orgs: MaidanOrganization[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/orgs.json"), "utf-8")
  );

  const currentView = (searchParams.view as "users" | "orgs") || "users";
  const search = decodeURI(searchParams.search || "").trim();

  const usersFiltred =
    currentView === "users"
      ? users.filter(val => {
          return (
            val.MainOrganization.toLowerCase().match(search.toLowerCase()) ||
            val.Organizations.join(", ")
              .toLowerCase()
              .match(search.toLowerCase()) ||
            val.Names.join(", ").toLowerCase().match(search.toLowerCase()) ||
            val.Reasons.toLowerCase().match(search.toLowerCase())
          );
        })
      : [];
  const orgsFiltred =
    currentView === "orgs"
      ? orgs.filter(val => {
          return val.Names.join(", ").toLowerCase().match(search.toLowerCase());
        })
      : [];

  return (
    <MainPage
      currentView={currentView}
      search={search}
      count={count}
      users={usersFiltred}
      orgs={orgsFiltred}
    />
  );
}
