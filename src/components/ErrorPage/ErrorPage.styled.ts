import styled from 'styled-components';
import theme from "../../global/styles/theme";

export const ErrorPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  .title {
    font: 2em 'Roboto', sans-serif;
    margin-bottom: 40px;
    color: ${theme.colors.primary['5']};
  }
`;
