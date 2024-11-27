import styled from "styled-components";
import changeTime from "../utils/changeTime";
import { mbtiDescriptions } from "../utils/mbtiCalculator";

const TestItem = ({
  result,
  currentUserId,
  changeVisibilityHandler,
  deleteResultHandler,
}) => {
  const isOwner = result.userId === currentUserId;
  const buttonText =
    result.visibility === true ? "비공개로 전환" : "공개로 전환";

  return (
    <ListItem>
      <ListTitle>
        <h3>🎅 {result.userId}</h3>
        <h4>({changeTime(result.id)})</h4>
      </ListTitle>
      <MbtiName>{result.mbtiName}</MbtiName>
      <h3>{mbtiDescriptions[result.mbtiName]}</h3>
      {isOwner && (
        <ButtonContainer>
          <button
            type="button"
            onClick={() =>
              changeVisibilityHandler(result.id, !result.visibility)
            }
          >
            {buttonText}
          </button>
          <button type="button" onClick={() => deleteResultHandler(result.id)}>
            삭제
          </button>
        </ButtonContainer>
      )}
    </ListItem>
  );
};

export default TestItem;

const ListItem = styled.li`
  width: 600px;
  height: auto;
  border: 1px solid var(--border--color);
  border-radius: 10px;
  padding: 20px;
`;

const ListTitle = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  border-bottom: 1px solid var(--border--color);
  padding-bottom: 10px;
  align-items: flex-end;

  h4 {
    font-size: 14px;
    color: #A9A9A9;
  }
`;

const MbtiName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    margin-top: 10px;
    border: 1px solid var(--border--color);
    border-radius: 6px;
    padding: 6px 12px;

    &:hover {
      background-color: var(--red--color);
      color: white;
    }
  }
`;
