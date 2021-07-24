import React from "react";
import styles from "./PublicationCard.module.css";
import { useUserContext } from "../../contexts/UserContext";

import InfoField from "./Field/InfoField";

const PublicationCard = ({ index, children }) => {
  const { user, setUser } = useUserContext();

  const currentPublication = user["Publications"][index];
  const name_of_auth = currentPublication["name_of_auth"];
  const yop = currentPublication["yop"];
  const title = currentPublication["title"];
  const journal_name = currentPublication["journal_name"];
  const nat_inter_imp = currentPublication["nat_inter_imp"];
  const impact_factor = currentPublication["impact_factor"];
  const vol_issue_no = currentPublication["vol_issue_no"];
  const issn_isbn = currentPublication["issn_isbn"];
  const indexing = currentPublication["indexing"];
  const inv_paper = currentPublication["inv_paper"];
  const prof_inv_file = currentPublication["prof_inv_file"];
  const studs_involved = currentPublication["studs_involved"];
  console.log(currentPublication);

  return (
    <div className={styles.PublicationCard__root_div}>
      <div className={styles.PublicationCard__info_box}>
        <div className={styles.PublicationCard__sl_no_panel}>
          <div className={styles.PublicationCard__sl_no_value}>{index}</div>
        </div>
        <div className={styles.PublicationCard__main_info}>
          <InfoField label={"Author's Name"} value={name_of_auth} />
          <InfoField label={"Published on"} value={yop} />
          <InfoField label={"Title"} value={title} />
          <InfoField label={"Journal"} value={journal_name} />
          <InfoField label={"Coverage"} value={nat_inter_imp} />
          <InfoField label={"Impact"} value={impact_factor} />
          <InfoField label={"Volume No/Issue No. & Page No"} value={vol_issue_no} />
          <InfoField label={"ISSN/ISBN"} value={issn_isbn} />
          <InfoField label={"Indexing"} value={indexing} />
          <InfoField label={"Invited Paper"} value={inv_paper ? "Yes" : "No"} />
          {/*  <InfoField label={"Proof of Invitation"} value={prof_inv_file} /> */}
          <InfoField label={"Students Involved"} value={studs_involved} />
        </div>
        <div className={styles.PublicationCard__edit_button_group}>
          <div className={styles.InfoField__edit_button}>Edit</div>
        </div>
      </div>
      <div className={styles.PublicationCard__attachment_box}></div>
    </div>
  );
};

export default PublicationCard;
