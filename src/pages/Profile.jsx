import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import useInput from "../hooks/useInput";
import styled from "styled-components";

const Profile = () => {
  const [newNickname, onChangeNewNicknameHandler, resetNewNickname] =
    useInput("");
    const [currentNickname, setCurrentNickname] = useState("");

    useEffect(() => {
      const fetchUserProfile = async () => {
          const userProfile = await getUserProfile(localStorage.getItem("accessToken"));
          setCurrentNickname(userProfile.nickname);
      };
  
      fetchUserProfile();
    }, []);

  const updateNicknameHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", newNickname);
    updateProfile(formData);
    setCurrentNickname(newNickname);
    resetNewNickname();
  };

  return (
    <>
      <Title>프로필 수정</Title>
      <NicknameForm onSubmit={updateNicknameHandler}>
        <label htmlFor="">닉네임</label>
        <input
          type="text"
          value={newNickname || currentNickname}
          placeholder="닉네임"
          onChange={onChangeNewNicknameHandler}
          required
        />
        <button type="submit">프로필 업데이트</button>
      </NicknameForm>
    </>
  );
};

export default Profile;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const NicknameForm = styled.form`
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
