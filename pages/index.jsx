import { Fragment, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import { useUserContext } from "../contexts/UserContext.jsx";

import DefaultContainer from "../components/container/DefaultContainer.jsx";
import HomeBackground from "../components/background/HomeBackground.jsx";
import Profile from "../components/Profile/Profile.jsx";
import Publications from "../components/Publications/Publications.jsx";

import styles from "./Home.module.css";
import { DataTypes, sidebarOptions, schema } from "../data/schema";

export default function Home() {
  const [session, loading] = useSession();
  const { user, setUser } = useUserContext();
  const [selectedSidebarOption, setSelectedSidebarOption] = useState(sidebarOptions[0]);

  const sidebarItemsNode = sidebarOptions.map((element) => (
    <li
      key={element}
      className={
        selectedSidebarOption === element
          ? `${styles.Home__li} ${styles.Home_li_selected}`
          : `${styles.Home__li} `
      }
      onClick={() => {
        setSelectedSidebarOption(element);
      }}
    >
      {element}
    </li>
  ));

  let DetailsPanelNode;
  switch (selectedSidebarOption) {
    case "Profile": {
      DetailsPanelNode = <Profile />;
      break;
    }
    case "Publications": {
      console.log("triggered");
      DetailsPanelNode = <Publications />;
      break;
    }
    default:
      DetailsPanelNode = null;
  }

  return (
    <Fragment>
      <Head>
        <title>IEM | FACULTY BOOK</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultContainer>
        <HomeBackground />
        {!!session && !loading ? (
          <div className={styles.Home__root_flex_container}>
            <header className={styles.Home__side_header_flex_item}>
              <h1 className={styles.Home__side_header_h1}>Faculty Book</h1>
              <ul className={styles.Home__ul}>{sidebarItemsNode}</ul>
            </header>
            <main className={styles.Home__details_flex_item}>
              <div className={styles.Home__status_bar}>
                {!!user ? (
                  <div className={styles.Home__welcome_text}>
                    Welcome, {user["Profile"]["name"].split(" ")[0]}
                  </div>
                ) : null}
              </div>
              {!!user ? DetailsPanelNode : null}
            </main>
          </div>
        ) : null}
      </DefaultContainer>
    </Fragment>
  );
}
