import React from "react";

const AdminRedirect = () => {
  return <div></div>;
};

export default AdminRedirect;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "admin/dashboard",
      permanent: true,
    },
  };
}
