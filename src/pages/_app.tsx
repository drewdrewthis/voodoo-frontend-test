import * as React from "react";
import "@/styles/globals.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
