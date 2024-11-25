import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import useInput from "../hooks/useInput";

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
      <h1>프로필 수정</h1>
      <form onSubmit={updateNicknameHandler}>
        <label htmlFor="">닉네임</label>
        <input
          type="text"
          value={newNickname || currentNickname}
          placeholder="닉네임"
          onChange={onChangeNewNicknameHandler}
          required
        />
        <button type="submit">프로필 업데이트</button>
      </form>
    </>
  );
};

export default Profile;
