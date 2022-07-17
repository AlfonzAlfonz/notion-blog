import { x } from "@xstyled/styled-components";
import { FC } from "react";
import { XProps } from "utils/XProps";

export const Container: FC<XProps<"div">> = p => {
  return (
    <x.div
      mx="auto"
      px={5}
      maxWidth={{
        "_": "100%",
        "sm": "540px",
        "md": "568px",
        "lg": "724px",
        "xl": "846px",
        "2xl": "846px"
      }}
      {...p}
    />
  );
};
