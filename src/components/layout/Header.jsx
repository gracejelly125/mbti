import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { isAuthenticated, removeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그아웃 버튼 클릭시 로컬스토리지 토큰 삭제
  const logoutHandler = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      toast.info("로그아웃되었습니다.")
      removeToken();
      navigate("/");
    }
  };

  return (
    <>
      <HeaderContainer>
        <nav>
          <ul>
            <li>
              <StyledLink to="/">홈</StyledLink>
            </li>
          </ul>
          <ul>
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
  background: var(--green--color);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: white;
  font-weight: 600;
  gap: 20px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 4px 6px;
`;

const LoginLink = styled(StyledLink)`
  border: 1px solid white;
  border-radius: 50px;
  padding: 6px 12px;
`;

const LogoutButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 6px 12px;
  background-color: var(--red--color);
  color: white;
`;
