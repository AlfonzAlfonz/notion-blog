import { x } from "@xstyled/styled-components";
import { Container } from "components/Container";
import { Page } from "components/Page";
import { getHomepageData } from "data/homepage";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { ResultPage } from "utils/ResultPage";

import { BlockObjectRenderer, RichtextItemRenderer } from "../components/Richtext";
import { BlockObjectResponse } from "../data/client";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...await getHomepageData()
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
        cover={cover!}
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
