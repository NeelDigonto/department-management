import React from "react";
import styles from "./PublicationCard.module.css";

const PublicationCard = ({ sl_no, content, right_upper_btn, right_lower_btn, children }) => {
  return (
    <div className={styles.PublicationCard__root_div}>
      <div className={styles.PublicationCard__info_box}>
        <div className={styles.PublicationCard__sl_no_panel}>
          <div className={styles.PublicationCard__sl_no_value}>{sl_no}</div>
        </div>
        <div className={styles.PublicationCard__main_info}>{content}</div>
        <div className={styles.PublicationCard__edit_button_group}>
          <button
            className={styles.InfoField__right_upper_button}
            onClick={right_upper_btn.handleClick}
          >
            <span>{right_upper_btn.label}</span>
          </button>
          <button
            className={styles.InfoField__right_lower_button}
            onClick={right_lower_btn.handleClick}
          >
            <span>{right_lower_btn.label}</span>
          </button>
        </div>
      </div>
      <div className={styles.PublicationCard__attachment_box}></div>
    </div>
  );
};

export default PublicationCard;
