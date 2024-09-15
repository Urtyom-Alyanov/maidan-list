import { unstable_cache } from "next/cache";
import { OrgFilter, UserFilter } from "./api/get-filtred-data";
import { MainPage } from "./components/mainPage";
import { getAndParseData } from "./delta-parsing/parse";
import { MaidanCount } from "./types";

const getCachedData = unstable_cache(
  async () => getAndParseData(),
  ["maidan-data"],
  { revalidate: 3600 }
);

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [users, orgs] = await getCachedData();

  const count: MaidanCount = {
    Organizations: orgs.length,
    Users: users.length,
  };

  const currentView = (searchParams.view as "users" | "orgs") || "users";
  const search = decodeURI(searchParams.search || "").trim();
  const rating = decodeURI(searchParams.rating || "12345").trim();
  const activity = decodeURI(searchParams.active || "").trim();

  const usersFiltred =
    currentView === "users"
      ? users.filter(UserFilter({ activity, rating, search }))
      : [];
  const orgsFiltred =
    currentView === "orgs"
      ? orgs.filter(OrgFilter({ activity, rating, search }))
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
