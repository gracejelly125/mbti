import styled from "styled-components";

const AuthForm = ({ mode, onSubmit, userId, password, nickname }) => {
  const isLogin = mode === "login";


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit(userId.value, password.value);
    } else {
      onSubmit(userId.value, password.value, nickname.value);
    }

    // 부모 컴포넌트에서 초기화 실행
    userId.reset();
    password.reset();
    if (!isLogin) {
      nickname.reset();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId.value}
          placeholder="아이디"
          onChange={userId.handler}
          required
        />
        <input
          type="password"
          value={password.value}
          placeholder="비밀번호"
          onChange={password.handler}
          required
        />
        {isLogin ? (
          <button type="submit">로그인</button>
        ) : (
          <>
            <input
              type="text"
              value={nickname.value}
              placeholder="닉네임"
              onChange={nickname.handler}
              required
            />
            <button type="submit">회원가입</button>
          </>
        )}
      </Form>
    </>
  );
};

export default AuthForm;

const Form = styled.form`
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
