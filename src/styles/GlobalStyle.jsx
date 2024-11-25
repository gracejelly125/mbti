import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
    // box sizing 리셋하기
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-style: normal;
    }
`;

export default GlobalStyle;
