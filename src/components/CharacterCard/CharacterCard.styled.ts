import styled from 'styled-components';
import theme from "../../global/styles/theme";

const glowStyle = `inset 0 0 10px ${theme.colors.glow[1]}`;
const glowStyleHover = `inset 0 0 20px ${theme.colors.glow[2]}`;
export const CharacterCardStyled = styled.div`
  border: 1px ${theme.colors.border[1]} solid;
  border-radius: 3px;
  padding: 20px;
  background-color: ${theme.colors.primary[1]};
  cursor: pointer;
  height: 100%;
  min-height: 150px;
  transition: 0.5s;
  -webkit-box-shadow: ${glowStyle};
  -moz-box-shadow: ${glowStyle};
  box-shadow: ${glowStyle};

  &:hover {
    border: 1px ${theme.colors.glow[2]} solid;
    -webkit-box-shadow: ${glowStyleHover};
    -moz-box-shadow: ${glowStyleHover};
    box-shadow: ${glowStyleHover};

    .character-name {
      color: ${theme.colors.glow[2]};
    }
  }

  .character-name {
    margin: 0 0 10px;
    color: ${theme.colors.primary[2]};
    transition: 0.5s;
    font-size: 15px;
  }
  .character-attribute {
    color: ${theme.colors.text[2]};
  }
`;