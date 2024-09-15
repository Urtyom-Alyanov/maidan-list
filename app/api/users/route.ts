import { NextRequest } from "next/server";
import { getCachedData } from "../get-cached-data";
import { UserFilter } from "../get-filtred-data";

export async function GET(request: NextRequest) {
  const [users] = await getCachedData();

  const url = new URL(request.url);

  const search = decodeURI(url.searchParams.get("search") || "").trim();
  const rating = decodeURI(url.searchParams.get("rating") || "12345").trim();
  const activity = decodeURI(
    url.searchParams.get("activity") || "41_31_21_11_01_30_20_10"
  ).trim();
  const usersFiltred = users.filter(UserFilter({ activity, rating, search }));

  return Response.json(usersFiltred);
}
