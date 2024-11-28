import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Layout from "../components/layout/Layout";
import Signup from "../pages/Signup";
import TestPage from "../pages/TestPage";
import Results from "../pages/Results";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 로그인 상태일 때 해당 페이지 접근 가능, 아니면 login 페이지로 강제 이동
const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// 로그인 상태가 아닐 때, 해당 페이지(login) 접근 가능, 로그인 상태면 profile 페이지로 이동
const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="test" element={<TestPage />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
