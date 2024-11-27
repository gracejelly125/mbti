import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import { Form, Title } from "../styles/common";

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
  const updateNicknameHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
    formData.append("nickname", newNickname.value);
    const updateSuccess = await updateProfile(formData);
    if (updateSuccess) {
      toast.success("닉네임 변경 성공!");
      setCurrentNickname(newNickname.value);
      newNickname.reset();
    }
    } catch (error) {
      console.error("error=>", error)
      toast.error("닉네임 변경 실패!")
    }
    
  };

  return (
    <>
      <Title>프로필 수정</Title>
      <Form onSubmit={updateNicknameHandler}>
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
      </Form>
    </>
  );
};

export default Profile;
