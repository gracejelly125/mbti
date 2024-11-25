import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { register } from "../api/auth";

const Signup = () => {
  const [userId, onChangeUserIdHandler, resetUserId] = useInput("");
  const [password, onChangePasswordHandler, resetPassword] = useInput("");
  const [nickname, onChangeNicknameHandler, resetNickname] = useInput("");
  const navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();
    register({
      id: userId,
      password: password,
      nickname: nickname,
    });

    navigate("/login");

    resetUserId();
    resetPassword();
    resetNickname();
  };

  return (
    <>
      <Title>회원가입</Title>
      <RegisterForm onSubmit={signupHandler}>
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
        <input
          type="text"
          value={nickname}
          placeholder="닉네임"
          onChange={onChangeNicknameHandler}
          required
        />
        <button type="submit">회원가입</button>
      </RegisterForm>
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

const RegisterForm = styled.form`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;
