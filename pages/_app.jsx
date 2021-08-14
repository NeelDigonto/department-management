import Head from "next/head";

import { Provider } from "next-auth/client";

import { UserContextProvider } from "../contexts/UserContext.jsx";
import UserDataLoader from "../components/DataLoader/UserDataLoader";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../themes/theme.jsx";

import React, { Fragment, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>IEM | FACULTY BOOK</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider session={pageProps.session}>
          <UserContextProvider>
            <UserDataLoader>
              <Component {...pageProps} />
            </UserDataLoader>
          </UserContextProvider>
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
