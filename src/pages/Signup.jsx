import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";

const Signup = () => {
  const userId = useInput("");
  const password = useInput("");
  const nickname = useInput("");
  const navigate = useNavigate();

  // api에 회원 정보를 추가한다.
  // api 명세서 양식에 맞춰 보내는 것이 중요하다.
  const signupHandler = async () => {
    try {
      await register({
      id: userId.value,
      password: password.value,
      nickname: nickname.value,
    });
    toast.success("회원가입 성공!")
    navigate("/login");
    userId.reset();
    password.reset();
    nickname.reset();
    } catch (error) {
      console.error("error =>", error)
      toast.error("회원가입 실패! 다시 시도해주세요.")
      throw error
    }
    
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
