import { Client } from "@notionhq/client";

export const TOKEN = process.env.TOKEN;
export const ROOT_ID = process.env.ROOT_ID!;

export const client = new Client({
  auth: TOKEN
});

export type BlockObjectResponse = Awaited<ReturnType<typeof _x>>;
export type RichtextItemResponse = ReturnType<typeof _x2>;

const _x = async () => client.blocks.children.list({ block_id: "" }).then(b => {
  const a = b.results[0];

  if ("type" in a) return a;
  throw new Error();
});

const _x2 = (x: BlockObjectResponse) => {
  if (x.type === "paragraph") return x.paragraph.rich_text[0];
  throw new Error();
};
