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

  return (
    <ListItem>
      <ListTitle>
        <p>{result.userId}</p>
        <p>({changeTime(result.id)})</p>
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
            {result.visibility === true ? "비공개로 전환" : "공개로 전환"}
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
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
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
