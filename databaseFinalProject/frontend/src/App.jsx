import { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Logo from "./components/Logo/Logo";
import MenuList from "./components/MenuList/MenuList";

// Pages
import Ram from "./pages/Product/Ram";
import Hhd from "./pages/Product/Hhd";
import Ssd from "./pages/Product/Ssd";

// Testing
import Testing from "./pages/Testing";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <BrowserRouter basename="/static">
      <Layout>
        <Sider className="sidebar" theme="light" collapsible>
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Ram />} />
              <Route path="/ram" element={<Ram />} />
              <Route path="/ssd" element={<Ssd />} />
              <Route path="/hhd" element={<Hhd />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
