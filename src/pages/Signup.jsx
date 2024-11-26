import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const userId = useInput("");
  const password = useInput("");
  const nickname = useInput("");
  const navigate = useNavigate();

  // api에 회원 정보를 추가한다.
  // api 명세서 양식에 맞춰 보내는 것이 중요하다.
  const signupHandler = () => {
    register({
      id: userId.value,
      password: password.value,
      nickname: nickname.value,
    });

    navigate("/login");
    userId.reset();
    password.reset();
    nickname.reset();
  };

  return (
    <>
      <Title>회원가입</Title>
      <AuthForm
        mode="signup"
        onSubmit={signupHandler}
        userId={userId}
        password={password}
        nickname={nickname}
      />
      <span>이미 계정이 있으신가요?</span>
      <Link to="/login">로그인</Link>
    </>
  );
};

export default Signup;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;
