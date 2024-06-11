import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "./MenuList.scss";

export default function MenuList() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      text: "Home",
    },
    {
      key: "product-list",
      icon: <SearchOutlined />,
      text: "Product",
      children: [
        {
          key: "ram",
          text: "RAM",
        },
        {
          key: "ssd",
          text: "SSD",
        },
        {
          key: "hdd",
          text: "HDD",
        },
      ],
    },
    {
      key: "testing",
      icon: <SettingOutlined />,
      text: "Order",
    },
    // {
    //   key: "order",
    //   icon: <UserOutlined />,
    //   text: "order",
    // },
    {
      key: "login",
      icon: <LogoutOutlined />,
      text: "Logout",
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      className="menu-bar"
      onClick={handleClick}
      selectedKeys={[]}
      defaultOpenKeys={["product-list"]}
    >
      {menuItems.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.text}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>{child.text}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.text}
          </Menu.Item>
        )
      )}
    </Menu>
  );
}
