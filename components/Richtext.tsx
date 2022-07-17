import { x } from "@xstyled/styled-components";
import { BlockObjectResponse, RichtextItemResponse } from "data/client";
import { FC } from "react";

import { all } from "../utils/only";
import { PublishedAt } from "./PublishedAt";

interface Props {
  value: BlockObjectResponse | BlockObjectResponse[];
}

export const BlockObjectRenderer: FC<Props> = ({ value }) => {
  const normalized = [value].flat();

  return (
    <x.div>
      {normalized.map((n, i) => {
        switch (n.type) {
          case "paragraph":
            return (
              <x.p pt={1} pb={2}>
                <RichtextItemRenderer value={n.paragraph.rich_text} />
              </x.p>
            );
          case "heading_1":
            return <x.h2 fontSize="xl" mt={4}><RichtextItemRenderer value={n.heading_1.rich_text} /></x.h2>;
          case "heading_2":
            return <x.h3 fontWeight="bold" mt={4}><RichtextItemRenderer value={n.heading_2.rich_text} /></x.h3>;
          case "heading_3":
            return <x.h4 fontWeight="bold" mt={4}><RichtextItemRenderer value={n.heading_3.rich_text} /></x.h4>;
          case "image":
            return (
              <figure>
                <x.img maxWidth="100%" src={n.image.type === "external" ? n.image.external.url : n.image.file.url} />
                <figcaption><RichtextItemRenderer value={n.image.caption} /></figcaption>
              </figure>
            );
          default:
            console.log(n);
            return <x.div color="red">Unsupported object :(</x.div>;
        }
      })}
    </x.div>
  );
};

export const RichtextItemRenderer: FC<{ value: RichtextItemResponse | RichtextItemResponse[] }> = ({ value }) => {
  return (
    <>
      {all(value).map(r => {
        switch (r.type) {
          case "text":
            return r.plain_text;
          case "mention":
            switch (r.mention.type) {
              case "date":
                return <PublishedAt time={r.mention.date.start} />;
              default:
                return <x.span color="red">Unsupported mention :(</x.span>;
            }
          default:
            console.log(r);
            return <x.span color="red">Unsupported richtext :(</x.span>;
        }
      })}
    </>
  );
};
