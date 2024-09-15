import { NextRequest } from "next/server";
import { getCachedData } from "../get-cached-data";
import { OrgFilter } from "../get-filtred-data";

export async function GET(request: NextRequest) {
  const [_, orgs] = await getCachedData();

  const url = new URL(request.url);

  const search = decodeURI(url.searchParams.get("search") || "").trim();
  const rating = decodeURI(url.searchParams.get("rating") || "12345").trim();
  const activity = decodeURI(url.searchParams.get("activity") || "").trim();
  const orgsFiltred = orgs.filter(OrgFilter({ activity, rating, search }));

  return Response.json(orgsFiltred);
}
