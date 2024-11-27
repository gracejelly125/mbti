import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { toast } from "react-toastify";

const Profile = () => {
  const newNickname = useInput("");
  const [currentNickname, setCurrentNickname] = useState("");

  // 로컬스토리지에서 토큰을 가져온 후, api로부터 해당하는 유저 정보를 가져온다.
  // 닉네임만 뽑아와서 현재 사용중인 닉네임을 보여준다.
  // 마운트됐을 때만 실행한다. (새로고침)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(
          localStorage.getItem("accessToken")
        );
        setCurrentNickname(userProfile.nickname);
      } catch (error) {
        console.error("error =>", error);
        throw error;
      }
    };

    fetchUserProfile();
  }, []);

  // 빈 formdata를 만들어서, 닉네임을 key-value 로 넣어준다.
  // api 에 변경요청을 보낸다.
  // formdata를 통해 crud 가능하다.
  // 현재닉네임을 변경된 닉네임으로 렌더링해준다.
  const updateNicknameHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", newNickname.value);
    const updateSuccess = updateProfile(formData);
    if (!updateSuccess) {
      toast.error("닉네임 변경 실패! 다시 시도해주세요.")
      return;
    }
    toast.success("닉네임 변경 성공!")
    setCurrentNickname(newNickname.value);
    newNickname.reset();
  };

  return (
    <>
      <Title>프로필 수정</Title>
      <NicknameForm onSubmit={updateNicknameHandler}>
        <label>닉네임</label>
        <input
          type="text"
          // 새로운 닉네임이 없다면, 현재 닉네임을 보여준다.
          value={newNickname.value || currentNickname}
          placeholder="닉네임"
          onChange={newNickname.handler}
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
    border: 1px solid black;
    border-radius: 6px;
    padding: 6px 12px;
  }
`;
