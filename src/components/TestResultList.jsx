import styled from "styled-components";
import changeTime from "../utils/changeTime";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TestResultList = ({ results, setResults }) => {
  // console.log("results", results);
  const { currentUserId } = useContext(AuthContext);
  // console.log('result.visibility', result.visibility);

  const changeVisibilityHandler = async (id, visibility) => {
    try {
      // 버튼클릭시 버튼 텍스트가 즉각적으로 변경되지 않음!
      // 상태변경함수가 비동기함수 내에 있음
      // 현재 배열에 받아온 id의 visibility만 넣어서 상태를 변경해준다.
      const updatedResults = results.map((result) =>
        result.id === id ? { ...result, visibility } : result
      );
      // console.log('up', updatedResults)
      setResults(updatedResults);
      await updateTestResultVisibility(id, visibility);
      // 비공개로 돌렸을 때, 사용자의 글이 false 더라도 해당 사용자에게는 보여져야 함.
      // 근데 사용자한테도 안 보여져버림..
      // => or 연산자로 해결!!! 
      // 화면에 렌더링 바로 안되는 문제,,
      // 부모컴포넌트의 useEffect에 넣어줌, 의존성배열에 filterdResults 넣어줌
      // filterdResults 가 바뀔때마다 리렌더링!
      // const filterdResults = updatedResults.filter(
      //   (result) =>
      //     result.visibility === true || result.userId === currentUserId
      // );
      // console.log("filterdResults", filterdResults);
      // setResults(filterdResults);
    } catch (error) {
      console.error("error =>", error);
      throw error;
    }
  };
  // 1. 1개 비공개처리후 화면 새로고침 => isPublic 이 true 인것만 filter로 뽑아준다.
  // 2. 새로고침 안하고 setResult를 바꿔준다. 해당 아이템만 제외된 것을 배열로 넣어준다.
  // => isPublic이 true인것만

  const deleteResultHandler = async (id) => {
    try {
      await deleteTestResult(id);
      // console.log("resultToDelete", id);
      // console.log('results', results)
      const updatedResults = results.filter((result) => result.id !== id);
      // console.log("updatedResults", updatedResults);
      setResults(updatedResults);
    } catch (error) {
      console.error("error =>", error);
      throw error;
    }
  };

  // console.log('currentUserId', currentUserId)

  return (
    <>
      <Container>
        {results.map((result) => (
          <li key={result.id}>
            <ListTitle>
              <p>{result.userId}</p>
              <p>({changeTime(result.id)})</p>
            </ListTitle>
            <MbtiName>{result.result}</MbtiName>
            <h3>{mbtiDescriptions[result.result]}</h3>
            {/* {console.log('result.userId', result.userId)} */}
            {result.userId === currentUserId && (
              <ButtonContainer>
                <button
                  type="button"
                  onClick={() =>
                    changeVisibilityHandler(result.id, !result.visibility)
                  }
                >
                  {result.visibility === true ? "비공개로 전환" : "공개로 전환"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteResultHandler(result.id)}
                >
                  삭제
                </button>
              </ButtonContainer>
            )}
          </li>
        ))}
      </Container>
    </>
  );
};

export default TestResultList;

const Container = styled.ul`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  line-height: 1.5;

  li {
    width: 600px;
    height: auto;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;

    .right {
      margin-right: 0;
    }
  }
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;

const MbtiName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    border: 1px solid black;
    border-radius: 6px;
    padding: 6px 12px;
  }
`;
