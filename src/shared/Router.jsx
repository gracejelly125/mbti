import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Layout from "../components/layout/Layout";
import Signup from "../pages/Signup";
import TestResult from "../pages/TestResultpage";
import TestPage from "../pages/TestPage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 로그인 상태면 
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? element : <Navigate to="/profile" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<PublicRoute element={<Login />} />} />
          <Route path="signup" element={<PublicRoute element={<Signup />} />} />
          <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="test" element={<PrivateRoute element={<TestPage />} />} />
          <Route
            path="results"
            element={<PrivateRoute element={<TestResult />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
