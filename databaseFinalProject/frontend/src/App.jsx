import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Logo from "./components/Logo/Logo";
import MenuList from "./components/MenuList/MenuList";

import { ShoppingCartProvider } from "./contexts/shoppingCartContext";

// Pages
import Ram from "./pages/Product/Ram";
import Hhd from "./pages/Product/Hhd";
import Ssd from "./pages/Product/Ssd";

// Testing
import Testing from "./pages/Testing";

// Login
import LoginForm from "./pages/LoginForm/LoginForm";


const { Header, Sider, Content } = Layout;

function App() {
  return (
    <ShoppingCartProvider>
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
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
