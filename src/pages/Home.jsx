import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <TitleContainer>
        <h1>무료 성격 테스트</h1>
        <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      </TitleContainer>
      <ContentContainer>
        <Container>
          <h3>성격 유형 검사</h3>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </Container>
        <Container>
          <h3>성격 유형 이해</h3>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </Container>
        <Container>
          <h3>성격 유형 검사</h3>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </Container>
      </ContentContainer>

      <StyledLink to="/test">내 성격 알아보러 가기</StyledLink>
    </>
  );
};

export default Home;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 20px;
  }

  p {
    font-size: 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 200px;
  max-height: 200px;
  align-items: center;
  justify-content: center;
  padding: 10px;

  h3 {
    margin-bottom: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px;
  border: 1px solid red;
  border-radius: 20px;
`;