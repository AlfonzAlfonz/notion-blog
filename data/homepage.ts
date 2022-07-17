import { client, client2 } from "./client";
import { getCoverUrl, getTitle } from "./utils";

const PAGE_ID = process.env.ROOT_ID!;

export const getHomepageData = async () => {
  const root = await client.pages.retrieve({ page_id: PAGE_ID });
  const rootBlocks = await client.blocks.children.list({ block_id: PAGE_ID });

  // const anotherPage = await client2.getPage(PAGE_ID);

  const pages = await Promise.all(
    rootBlocks.results
      .filter(b => "type" in b && b.type === "child_page")
      .map(page => client.blocks.children.list({ block_id: page.id }).then(blocks => ({ page, blocks })))
  );

  if (!("url" in root)) throw new Error("lol");

  const title = await getTitle(client, PAGE_ID);

  return {
    root,
    title: title.title,
    cover: getCoverUrl(root.cover),
    pages
    // anotherPage
  };
};
