import { x } from "@xstyled/styled-components";
import { Page } from "components/Page";
import { BlockObjectRenderer, RichtextItemRenderer } from "components/Richtext";
import { client, ROOT_ID } from "data/client";
import { getCoverUrl, getTitle } from "data/utils";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Link from "next/link";
import { only } from "utils/only";
import { ResultPage } from "utils/ResultPage";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = only(ctx.params!.id!);
  const page = await client.pages.retrieve({ page_id: id });
  const title = await getTitle(client, id);
  const blocks = await client.blocks.children.list({ block_id: id });

  if (!("url" in page)) {
    return {
      notFound: true,
      revalidate: 60
    } as const;
  }

  return {
    props: {
      page,
      cover: getCoverUrl(page.cover),
      title,
      blocks
    },
    revalidate: 60
  } as const;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await client.blocks.children.list({ block_id: ROOT_ID })
    .then(r =>
      r.results
        .filter(b => "type" in b && b.type === "child_page")
        .map(({ id }) => ({ params: { id } }))
    ),
  fallback: "blocking"
});

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
      cover={cover}
    >
      <BlockObjectRenderer value={blocks.results as any} />
    </Page>
  );
};

export default Post;
