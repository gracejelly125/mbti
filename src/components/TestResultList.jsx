import styled from "styled-components";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TestItem from "./TestResultItem";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TestResultList = ({ testResults }) => {
  const { currentUserId } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // 테스트 결과 비공개 or 공개 전환 기능
  const toggleMutation = useMutation({
    mutationFn: async ({id, visibility}) => {
      await updateTestResultVisibility( id, visibility );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
      toast.success("전환 성공!")
    },
    onError: () => {
      toast.error("전환 실패! 다시 시도해주세요.");
    },
  });

  // 테스트 결과 삭제 기능
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await deleteTestResult(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
      toast.success("삭제 성공!");
    },
    onError: () => {
      toast.error("삭제 실패! 다시 시도해주세요.");
    },
  });

  const changeVisibilityHandler = (id, visibility) => {
    toggleMutation.mutate({id, visibility})
  }

  const deleteResultHandler = (id) => {
    removeMutation.mutate(id)
  }

  return (
    <>
      <Container>
        {testResults.map((result) => (
          <TestItem
            key={result.id}
            result={result}
            currentUserId={currentUserId}
            changeVisibilityHandler={changeVisibilityHandler}
            deleteResultHandler={deleteResultHandler}
          />
        ))}
      </Container>
    </>
  );
};

export default TestResultList;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  line-height: 1.5;
`;
