import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { login } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const [userId, onChangeUserIdHandler, resetUserId] = useInput("");
  const [password, onChangePasswordHandler, resetPassword] = useInput("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const {accessToken} = await login({
      id: userId,
      password: password,
    });
    console.log(setToken)
    setToken(accessToken);
    navigate("/");
    resetUserId();
    resetPassword();
  };

  return (
    <>
      <Title>로그인</Title>
      <LoginForm onSubmit={loginHandler}>
        <input
          type="text"
          value={userId}
          placeholder="아이디"
          onChange={onChangeUserIdHandler}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChangePasswordHandler}
          required
        />
        <button type="submit">로그인</button>
      </LoginForm>
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

const LoginForm = styled.form`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;

  button {
  padding: 10px;
  border: 1px solid red;
  border-radius: 20px;
  }
`;
