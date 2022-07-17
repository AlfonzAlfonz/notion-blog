import { Page } from "components/Page";
import { client } from "data/client";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { FC } from "react";
import { ResultPage } from "utils/ResultPage";
import { only } from "../utils/only";
import { BlockObjectRenderer, RichtextItemRenderer } from "../components/Richtext";
import { x } from "@xstyled/styled-components";
import { getCoverUrl, getTitle } from "../data/utils";
import { PublishedAt } from "components/PublishedAt";
import Link from "next/link";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = only(ctx.params!.id!);
  const page = await client.pages.retrieve({ page_id: id });
  const title = await getTitle(client, id);
  const blocks = await client.blocks.children.list({ block_id: id });

  if (!("url" in page)) throw new Error("lol");

  return {
    props: {
      page,
      cover: getCoverUrl(page.cover),
      title,
      blocks
    }
  };
};

export const getStaticPaths: GetStaticPaths = () => ({ paths: [], fallback: "blocking" });

const Post: ResultPage<typeof getStaticProps> = ({ title, page, cover, blocks }) => {
  return (
    <Page
      title={(
        <>
          <x.h2 fontSize="2xl" mb={-5}><RichtextItemRenderer value={title.title} /></x.h2>
          <x.div mt={8} mb={-4}>
            <Link href="/" passHref><x.a color="white">← Back</x.a></Link>
          </x.div>
        </>
      )}
      cover={cover!}
    >
      <BlockObjectRenderer value={blocks.results as any} />
    </Page>
  );
};

export default Post;
