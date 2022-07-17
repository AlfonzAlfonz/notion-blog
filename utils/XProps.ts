import { SystemProps } from "@xstyled/styled-components";

export type XProps<T extends keyof JSX.IntrinsicElements> = Omit<JSX.IntrinsicElements[T], "color" | "ref"> & SystemProps;
