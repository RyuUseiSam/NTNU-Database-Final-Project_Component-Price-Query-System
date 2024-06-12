import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  // MdOutlineCollectionsBookmark,
} from "@ant-design/icons";

import { MdOutlineCollectionsBookmark } from "react-icons/md";

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
      key: "order",
      icon: <ShoppingCartOutlined />,
      text: "Order",
    },
    // {
    //   key: "testing",
    //   icon: <UserOutlined />,
    //   text: "Testing",
    // },
    {
      key: "collection",
      icon: <MdOutlineCollectionsBookmark />,
      text: "Collection",
    },
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
