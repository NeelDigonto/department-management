import React from "react";
import styles from "./HomeBackground.module.css";
import Image from "next/image";

import HomeBackgroundImage from "../../public/image/HomeBackground_200b.jpg";

const HomeBackground = () => {
  return (
    <div className={styles.HomeBackground__root_container}>
      <Image
        src={HomeBackgroundImage}
        alt="Home Page Background"
        layout="fill"
        objectFit="cover"
        objectPosition="left top"
        unoptimized={false}
        quality={100}
      />
    </div>
  );
};

export default HomeBackground;
