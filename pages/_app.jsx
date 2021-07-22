import "normalize.css";
import "../styles/globals.css";

import { Provider } from "next-auth/client";

import { UserContextProvider } from "../contexts/UserContext.jsx";
import UserDataLoader from "../components/DataLoader/UserDataLoader";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UserContextProvider>
        <UserDataLoader>
          <Component {...pageProps} />
        </UserDataLoader>
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
