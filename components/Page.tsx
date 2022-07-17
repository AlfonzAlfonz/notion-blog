import { x } from "@xstyled/styled-components";
import { FC, ReactNode } from "react";

import { Container } from "./Container";

interface Props {
  title?: ReactNode;
  cover: string;

  children?: ReactNode;
}

export const Page: FC<Props> = ({ cover, title, children }) => {
  return (
    <>
      <x.div>
        <x.div background={`url(${cover})`} backgroundSize="cover" py={8} pt={12} color="white">
          <Container>
            {title}
          </Container>
        </x.div>
      </x.div>
      <x.div>
        <Container spaceY={4} mt={5}>
          {children}
        </Container>
      </x.div>
    </>
  );
};
