import { MaidanCount } from "../../types";
import { getCachedData } from "../get-cached-data";

export async function GET() {
  const [users, orgs] = await getCachedData();

  const count: MaidanCount = {
    Organizations: orgs.length,
    Users: users.length,
  };

  return Response.json(count);
}
