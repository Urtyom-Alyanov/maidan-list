import { promises as fs } from "fs";
import path from "path";
import { MaidanCount } from "../../types";

export async function GET() {
  const count: MaidanCount = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "/app/count.json"), "utf-8")
  );

  return Response.json(count);
}
