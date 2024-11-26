import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { login } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";


const Login = () => {
  const userId = useInput("");
  const password = useInput("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // user 정보를 api에 보낸 다음 해당하는 token 을 가져온다.
  // token을 로컬스토리지에 저장한다.
  // 이후 홈 화면으로 이동한다.
  const loginHandler = async () => {
    const data = await login({
      id: userId.value,
      password: password.value,
    });
    console.log('id', data.userId);
    console.log('accessToken', data.accessToken)
    setToken(data.accessToken, data.userId);
    navigate("/");
    userId.reset();
    password.reset();
  };

  return (
    <>
      <Title>로그인</Title>
      <AuthForm mode="login" onSubmit={loginHandler} userId={userId} password={password}/>
      <span>계정이 없으신가요?</span>
      <Link to="/signup">회원가입</Link>
    </>
  );
};

export default Login;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;
