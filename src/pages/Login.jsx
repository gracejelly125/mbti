import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { login } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";
import { Title } from "../styles/common";

const Login = () => {
  const userId = useInput("");
  const password = useInput("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // user 정보를 api에 보낸 다음 해당하는 token 을 가져온다.
  // token을 로컬스토리지에 저장한다.
  // 이후 홈 화면으로 이동한다.
  const loginHandler = async () => {
    try {
      const data = await login({
        id: userId.value,
        password: password.value,
      });
      toast.success("로그인 성공!")
      setToken(data.accessToken, data.userId);
      navigate("/");
      userId.reset();
      password.reset();
    } catch (error) {
      console.error("error =>", error);
      toast.error("로그인 실패! 다시 시도해주세요.")
      throw error;
    }
  };

  return (
    <>
      <Title>로그인</Title>
      <AuthForm
        mode="login"
        onSubmit={loginHandler}
        userId={userId}
        password={password}
      />
      <Msg>계정이 없으신가요?</Msg>
      <StyledLink to="/signup">회원가입</StyledLink>
    </>
  );
};

export default Login;

const Msg = styled.span`
  margin-bottom: 4px;
`

const StyledLink = styled(Link)`
  color: var(--red--color);
  padding: 4px 12px;
`