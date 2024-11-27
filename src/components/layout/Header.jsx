import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, removeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      removeToken();
      navigate("/");
    }
  };

  return (
    <>
      <HeaderContainer>
        <nav>
          <ul className="left">
            <li>
              <StyledLink to="/">홈</StyledLink>
            </li>
          </ul>
          <ul className="right">
            <li>
              <StyledLink to="/profile">프로필</StyledLink>
            </li>
            <li>
              <StyledLink to="/test">테스트</StyledLink>
            </li>
            <li>
              <StyledLink to="/results">결과보기</StyledLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton>
                </li>
              </>
            ) : (
              <li>
                <LoginLink to="/login">로그인</LoginLink>
              </li>
            )}
          </ul>
        </nav>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  background: gray;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: white;
  font-weight: 600;
  gap: 20px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .left {
    margin-right: auto;
  }

  .right {
    margin-left: auto;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LoginLink = styled(StyledLink)`
  border: 1px solid black;
  border-radius: 50px;
  padding: 4px 8px;
`;

const LogoutButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 4px 8px;
  background-color: black;
  color: white;
`;
