import { Form } from "react-router-dom";

const AuthForm = ({ mode, onSubmit, userId, password, nickname }) => {
  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit(userId.value, password.value);
    } else {
      onSubmit(userId.value, password.value, nickname.value);
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

