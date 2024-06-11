import React from "react";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import Logo from "./components/Logo/Logo";
import MenuList from "./components/MenuList/MenuList";

import {
  ShoppingCartProvider,
  useShoppingCart,
} from "./contexts/shoppingCartContext";

// Pages
import Home from "./pages/Home/Home";
import Ram from "./pages/Product/Ram";
import Hdd from "./pages/Product/Hdd";
import Ssd from "./pages/Product/Ssd";
import Order from "./pages/Order/Order";

// Testing
import Testing from "./pages/Testing";

// Login
import LoginForm from "./pages/LoginForm/LoginForm";

const { Header, Sider, Content } = Layout;

function AppContent() {
  const { openCart, cartQuantity } = useShoppingCart();
  const location = useLocation();

  return (
    <>
      <Layout>
        <Sider className="sidebar" theme="light" collapsible>
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ram" element={<Ram />} />
              <Route path="/ssd" element={<Ssd />} />
              <Route path="/hdd" element={<Hdd />} />
              <Route path="/order" element={<Order />} />
              <Route path="/testing" element={<Order />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      {location.pathname !== "/" && location.pathname !== "/home" && (
        <div className="fixed-button" onClick={openCart}>
          <FaShoppingCart />
          <div
            className="cart-quantity"
            style={{ display: cartQuantity >= 0 ? "block" : "none" }}
          >
            {cartQuantity}
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        {/* For Frontend Testing Mode */}
        {/* <BrowserRouter basename="/static"> */}
        <AppContent />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
