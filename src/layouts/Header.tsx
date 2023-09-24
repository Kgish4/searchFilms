import { Layout, Menu } from "antd";
import React, { FC, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOutWithGoogle } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../main";

const menuItems = [
  {
    name: "Play",
    to: "/",
  },
  {
    name: "My List",
    to: "/my-films",
  },
  {
    name: "Matches",
    to: "/matches",
  },
  { name: "Logout", handler: signOutWithGoogle },
];

// type testType = { name: string; children?: FC; onClick?: () => void };
// type testType2 = {
//   key: string;
//   label: string;
//   children?: FC;
//   onClick: (() => void) | null;
// };
const Header: FC = () => {
  const { auth } = useContext(Context);

  const navigate = useNavigate();

  const handleMenuItemClick = (to: string) => {
    navigate(to, { replace: true });
  };
  const [user] = useAuthState(auth);

  const generateMenu = useCallback(
    ({ name, handler, to }) => ({
      key: name,
      label: name,
      onClick: handler ? handler : () => handleMenuItemClick(to),
    }),
    []
  );

  const items1 = menuItems.map(generateMenu);

  return (
    <Layout.Header>
      {user && <Menu theme="dark" mode="horizontal" items={items1} />}
    </Layout.Header>
  );
};

export default Header;
