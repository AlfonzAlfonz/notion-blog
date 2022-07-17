import { Client } from "@notionhq/client";

export const getTitle = async (client: Client, pageId: string) => {
  const title = await client.pages.properties.retrieve({ page_id: pageId, property_id: "title" });

  if (title.object !== "list" || !("title" in title.results[0])) throw new Error("lol");
  return title.results[0];
};

export const getCoverUrl = (c: Cover) => c?.type === "external" ? c.external.url : c?.file.url;

type Cover =
  | {
    type: "external";
    external: { url: string };
  }
  | {
    type: "file";
    file: { url: string; expiry_time: string };
  }
  | null;
