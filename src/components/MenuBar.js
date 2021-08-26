import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const menuBar = user ? (
    <Menu position="left" secondary size="massive" color="black">
      <Menu.Item style={{ fontSize: 24 }} content="KeepUp" as={Link} to="/" />
      <Menu.Item
        content={user.username + "'s dashboard"}
        style={{ fontSize: 24 }}
        as={Link}
        to="/dashboard"
      />
      <Menu.Menu position="right">
        <Menu.Item
          style={{ fontSize: 24 }}
          content="logout"
          active={activeItem === "logout"}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="black">
      <Menu.Item content="KeepUp" style={{ fontSize: 24 }} as={Link} to="/" />
      <Menu.Item
        style={{ fontSize: 24 }}
        content="your dashboard"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      />
      <Menu.Menu position="right">
        <Menu.Item
          style={{ fontSize: 24 }}
          content="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          style={{ fontSize: 24 }}
          content="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar