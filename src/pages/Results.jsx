import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList"

const Results = () => {
  // tanstackQuery 가 useState, useEffect 상태관리 대체해줌
  // 전역상태로 관리해야되는 DB.Json 에 있는 것과 동기화 시켜야 되는 상태!
  // useQuery로 상태 관리해야됨
  const { currentUserId } = useContext(AuthContext);


  const { data: testResults, isPending } = useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      const { data } = await getTestResults();
      return data;
    }
  }) 

  if (isPending) return <h2>로딩중...</h2>

  // 쿼리펑션 로직 작성
  // filterdResults 를 dependency 배열에 넣어서, 상태가 변경될 때마다 리렌더링해준다.
  // useEffect(() => {
  //   const fetchTestResults = async () => {
  //     try {
  //       const fetchedTestResults = await getTestResults();
  //       const filterdResults = fetchedTestResults.filter(
  //         (result) =>
  //           result.visibility === true || result.userId === currentUserId
  //       );
  //       setResults(filterdResults);
  //     } catch (error) {
  //       console.error("error =>", error);
  //       throw error;
  //     }
  //   };

  //   fetchTestResults();
  // }, [currentUserId]);

  return (
    <>
      <Title>모든 테스트 결과</Title>
      <TestResultList TestResults={testResults} />
    </>
  );
};

export default Results;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
`;
