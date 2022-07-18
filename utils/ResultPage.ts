import { GetStaticProps } from "next";
import { FC } from "react";

export type ResultPage<T extends GetStaticProps> = FC<SSPResult<T>>;

type SSPResult<T extends GetStaticProps> = Awaited<ReturnType<T>> extends { props?: unknown }
  ? NonNullable<Awaited<ReturnType<T>>["props"]>
  : never;
