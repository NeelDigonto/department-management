import React, { useState, useEffect } from "react";
import PublicationCard from "./PublicationCard";

const APublication = ({ element, index }) => {
  /*  return <DisplayPublication element={element} index={index} />; */
  return <PublicationCard index={index} />;
};

export default APublication;
