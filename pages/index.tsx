import React from "react";

const Redirect = () => {
  return <div></div>;
};

export default Redirect;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/profile",
      permanent: false,
    },
  };
}
