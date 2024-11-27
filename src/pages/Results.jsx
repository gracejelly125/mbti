import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import { toast } from "react-toastify";

const Results = () => {
  // tanstackQuery 가 useState, useEffect를 대체해준다.
  // 전역상태로 관리해야 되는 DB.json의 데이터와 동기화 시켜준다.
  // useQuery로 상태를 관리한다.
  const { currentUserId } = useContext(AuthContext);

  const { data: testResults, isPending } = useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        // console.log('testResults', testResults)
        // console.log('testResults.visibility', testResults.visibility)
        return testResults;
      } catch (error) {   
        console.error("error =>", error);
        toast.error("모든 테스트 결과 불러오기 실패!");
      }
    },
    select: (testResults) => {
      return testResults.filter(
        (result) =>
          result.visibility === true || result.userId === currentUserId
      );
    },
  });

  

  if (isPending) return <h2>로딩중...</h2>;

  return (
    <>
      <Title>모든 테스트 결과</Title>
      <TestResultList testResults={testResults} />
    </>
  );
};

export default Results;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
`;
