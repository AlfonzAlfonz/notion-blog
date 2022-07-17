import { x } from "@xstyled/styled-components";
import { FC, useMemo } from "react";

interface Props {
  time: string;
}

export const PublishedAt: FC<Props> = ({ time }) => {
  const localeString = useMemo(() =>
    new Date(time).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) + " " +
    new Date(time).toLocaleTimeString(), [time]);
  return (
    <x.time dateTime={time} fontStyle="italic">
      {localeString}
    </x.time>
  );
};

const intl = new Intl.DateTimeFormat();
