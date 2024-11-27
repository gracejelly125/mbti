import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import { AuthContext } from "../context/AuthContext";

const Results = () => {
  const [results, setResults] = useState([]);
  const { currentUserId } = useContext(AuthContext);

  // filterdResults 를 dependency 배열에 넣어서, 상태가 변경될 때마다 리렌더링해준다.
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const fetchedTestResults = await getTestResults();
        const filterdResults = fetchedTestResults.filter(
          (result) =>
            result.visibility === true || result.userId === currentUserId
        );
        setResults(filterdResults);
      } catch (error) {
        console.error("error =>", error);
        throw error;
      }
    };

    fetchTestResults();
  }, [currentUserId]);

  return (
    <>
      <Title>모든 테스트 결과</Title>
      <TestResultList results={results} setResults={setResults} />
    </>
  );
};

export default Results;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
`;
