import * as React from "react";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import { AppProps } from "next/app";

import theme from "../src/themes/theme";
import { UserContextProvider } from "../src/contexts/UserContext";
import UserDataLoader from "../src/components/DataLoader/UserDataLoader";
import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <React.Fragment>
      <style jsx global>{`
        /* Other global styles such as 'html, body' etc... */

        html,
        body {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
        }

        #__next {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>FACULTY BOOK</title>
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
    </React.Fragment>
  );
}
