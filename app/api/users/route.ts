import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import { MaidanUser } from "../../types";

export async function GET(request: NextRequest) {
  const users: MaidanUser[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/users.json"), "utf-8")
  );

  const url = new URL(request.url);

  const search = decodeURI(url.searchParams.get("search") || "").trim();
  const rating = decodeURI(url.searchParams.get("rating") || "12345").trim();
  const activity = decodeURI(
    url.searchParams.get("activity") || "41_31_21_11_01_30_20_10"
  ).trim();
  const usersFiltred = users.filter(val => {
    const activityFilter = activity
      .split("_")
      .some(act => act.startsWith(val.Activity));
    const ratingFilter = rating.split("").map(parseInt).includes(val.Rating);
    return (
      (val.MainOrganization.toLowerCase().match(search.toLowerCase()) ||
        val.Organizations.join(", ")
          .toLowerCase()
          .match(search.toLowerCase()) ||
        val.Names.join(", ").toLowerCase().match(search.toLowerCase()) ||
        val.Reasons.toLowerCase().match(search.toLowerCase())) &&
      ratingFilter &&
      activityFilter
    );
  });

  return Response.json(usersFiltred);
}
