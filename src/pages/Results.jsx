import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import { AuthContext } from "../context/AuthContext";

const Results = () => {
  const [results, setResults] = useState([]);
  const { currentUserId } =useContext(AuthContext);

  useEffect(() => {
    const fetchTestResults = async () => {
      const fetchedTestResults = await getTestResults();
      const filterdResults = fetchedTestResults.filter(
        (result) =>
          result.visibility === true || result.userId === currentUserId
      ); 
      setResults(filterdResults);
    };

    fetchTestResults();
  }, [currentUserId]);

  return (
    <>
      <Title>모든 테스트 결과</Title>
      <TestResultList results={results} setResults={setResults}/>
    </>
  );
};

export default Results;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
`;

