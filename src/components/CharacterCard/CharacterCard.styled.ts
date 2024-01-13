import styled from 'styled-components';
import theme from "../../global/styles/theme";

const glowStyle = `inset 0 0 20px ${theme.colors.glow[1]}`;
export const CharacterCardStyled = styled.div`
  border: 1px ${theme.colors.border[1]} solid;
  border-radius: 3px;
  padding: 20px;
  background-color: black;
  cursor: pointer;
  height: 100%;
  min-height: 150px;
  transition: 0.5s;

  &:hover {
    -webkit-box-shadow: ${glowStyle};
    -moz-box-shadow: ${glowStyle};
    box-shadow: ${glowStyle};
  }
`;