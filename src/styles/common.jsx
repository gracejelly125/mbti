import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  margin: 20px;
  font-size: 20px;
  text-decoration: none;
  color: black;
  border: 1px solid var(--border--color);
  border-radius: 10px;
  padding: 10px 20px;

  &:hover {
    color: white;
    border: none;
    background-color: var(--red--color);
  }
`

export const Form = styled.form`
  border: 1px solid var(--border--color);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  input {
    font-size: 18px;
    padding: 6px;
  }

  button {
    font-size: 18px;
    border: none;
    background-color: var(--green--color);
    color: white;
    border-radius: 6px;
    padding: 6px 12px;
  }
`;

export const Title = styled.h1`
font-size: 20px;
font-weight: bold;
margin: 20px;
`;