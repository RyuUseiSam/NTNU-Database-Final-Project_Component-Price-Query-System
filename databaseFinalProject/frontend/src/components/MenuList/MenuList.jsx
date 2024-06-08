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

  return (
    <Menu
      theme="light"
      mode="inline"
      className="menu-bar"
      onClick={handleClick}
    >
      <Menu.Item key="" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.SubMenu
        key="product-list"
        icon={<SearchOutlined />}
        title="Product"
      >
        <Menu.Item key="ram" title="RAM">
          RAM
        </Menu.Item>
        <Menu.Item key="ssd" title="SSD">
          SSD
        </Menu.Item>
        <Menu.Item key="hhd" title="HHD">
          HHD
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="testing" icon={<SettingOutlined />}>
        Testing
      </Menu.Item>
      <Menu.Item key="user" icon={<UserOutlined />}>
        User
      </Menu.Item>
      <Menu.Item key="login" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
}
