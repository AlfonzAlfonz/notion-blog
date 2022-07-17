import { defaultTheme, Preflight, ThemeProvider } from "@xstyled/styled-components";

import type { AppProps } from "next/app";
function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Preflight /><Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

const theme = {
  ...defaultTheme
};
