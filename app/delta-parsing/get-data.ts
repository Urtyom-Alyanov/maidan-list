"use server";

import axios from "axios";
import { JSDOM } from "jsdom";

export async function getDataFromDeltaStreaming(): Promise<Document> {
  const deltaStreamUrl =
    process.env.DELTA_URL || `https://delta-streaming.neocities.org/`;

  const { data } = await axios.get<string>(deltaStreamUrl, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    },
    responseType: "document",
  });

  const parser = new JSDOM(data, { contentType: "text/html" });
  return parser.window.document;
}
