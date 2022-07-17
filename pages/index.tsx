import { x } from "@xstyled/styled-components";
import { Page } from "components/Page";
import { BlockObjectRenderer, RichtextItemRenderer } from "components/Richtext";
import { BlockObjectResponse, client, ROOT_ID } from "data/client";
import { getCoverUrl, getTitle } from "data/utils";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { ResultPage } from "utils/ResultPage";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const root = await client.pages.retrieve({ page_id: ROOT_ID });
  const rootBlocks = await client.blocks.children.list({ block_id: ROOT_ID });

  const pages = await Promise.all(
    rootBlocks.results
      .filter(b => "type" in b && b.type === "child_page")
      .map(page => client.blocks.children.list({ block_id: page.id }).then(blocks => ({ page, blocks })))
  );

  if (!("url" in root)) throw new Error("lol");

  const title = await getTitle(client, ROOT_ID);

  return {
    props: {
      root,
      title: title.title,
      cover: getCoverUrl(root.cover),
      pages
    }
  };
};

const Home: ResultPage<typeof getStaticProps> = ({ root, cover, title, pages }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Page
        title={<x.h1 fontSize="2xl" color="white"><RichtextItemRenderer value={title} /></x.h1>}
        cover={cover}
      >
        {pages.map(({ page, blocks }) =>
          "child_page" in page && (
            <x.div key={page.id} borderBottom="2px dashed gray" py={2}>
              <x.h2 fontSize="xl" mb={1}><Link href={`/${page.id}`}>{page.child_page.title}</Link></x.h2>
              <ArticleInfo value={blocks.results as any} id={page.id} />
            </x.div>
          )
        )}
      </Page>
    </>
  );
};

export default Home;

const ArticleInfo: FC<{value: BlockObjectResponse[]; id: string }> = ({ value, id }) => {
  return (
    <>
      <BlockObjectRenderer value={value.slice(0, 10)} />
      { value.length > 10 && (
        <x.div my={3} fontSize="lg" textAlign="center">
          <Link href={`/${id}`}><x.a color="gray" fontStyle="italic">Read more...</x.a></Link>
        </x.div>
      )}
    </>
  );
};
