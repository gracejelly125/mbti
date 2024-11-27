import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const TestPage = () => {
  const navigate = useNavigate();
  // 클라이언트 UI 상태는 별도 관리해줘야 한다.
  // 인풋 상태를 관리하고 있는 것과 마찬가지이다.
  // 제어 컴포넌트, 타이핑할 때마다 인풋 값을 일시적으로 관리해준다.
  const [result, setResult] = useState(null);

  // API 호출과 관련된 상태를 관리한다.
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (newTestResult) => createTestResult(newTestResult),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["testResults"]);
      setResult(data.mbtiName);
    },
  });

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    // console.log('mbtiResult', mbtiResult) => ESTJ 출력
    const token = localStorage.getItem("accessToken");
    try {
      const userProfile = await getUserProfile(token);

      const newTestResult = {
        id: Date.now(),
        userId: userProfile.id,
        mbtiName: mbtiResult,
        visibility: true,
      };

      addMutation.mutate(newTestResult);
      toast.success("테스트 성공!")
    } catch (error) {
      console.error("error =>", error);
      toast.error("테스트 실패! 다시 시도해주세요.")
    }
  };

  const handleNavigateToResults = () => {
    navigate("/results");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-center text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-black border border-black py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
