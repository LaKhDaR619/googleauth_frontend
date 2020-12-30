import React, { useContext } from "react";
import { Button, PageHeader } from "antd";
import { authContext } from "../../App";

function Header() {
  const { auth, authDispatch } = useContext(authContext);

  const handleLogout = () => {
    authDispatch({ type: "logout" });
  };

  const extra = auth.loggedIn
    ? [
        <Button key="1" type="link" onClick={handleLogout}>
          Logout
        </Button>,
      ]
    : [];

  return (
    <PageHeader className="site-page-header" title="Tasky" extra={extra} />
  );
}

export default Header;
