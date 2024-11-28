import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 70px 20px;
`;
