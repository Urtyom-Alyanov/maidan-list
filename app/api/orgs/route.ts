import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import { MaidanOrganization } from "../../types";

export async function GET(request: NextRequest) {
  const orgs: MaidanOrganization[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/orgs.json"), "utf-8")
  );

  const url = new URL(request.url);

  const search = decodeURI(url.searchParams.get("search") || "").trim();
  const rating = decodeURI(url.searchParams.get("rating") || "12345").trim();
  const activity = decodeURI(url.searchParams.get("activity") || "").trim();
  const orgsFiltred = orgs.filter(val => {
    const activityFilter = val.Activity.some(val => val.includes(activity));
    const ratingFilter = rating.split("").map(parseInt).includes(val.Rating);
    return (
      val.Names.join(", ").toLowerCase().match(search.toLowerCase()) &&
      ratingFilter &&
      activityFilter
    );
  });

  return Response.json(orgsFiltred);
}
