import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";

import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

import theme from "../src/themes/theme.jsx";
import { UserContextProvider } from "../src/contexts/UserContext.jsx";
import UserDataLoader from "../src/components/DataLoader/UserDataLoader";
import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>IEM | FACULTY BOOK</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={5000}
          TransitionComponent={Slide}
          dense={false}
        >
          <Provider session={pageProps.session}>
            <UserContextProvider>
              <UserDataLoader>
                <Component {...pageProps} />
              </UserDataLoader>
            </UserContextProvider>
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
