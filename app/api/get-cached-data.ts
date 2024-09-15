"use server";

import { unstable_cache } from "next/cache";
import { getAndParseData } from "../delta-parsing/parse";

export const getCachedData = unstable_cache(
  async () => getAndParseData(),
  ["maidan-data"],
  { revalidate: 3600 }
);
