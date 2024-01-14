import styled, { css } from 'styled-components';
import theme from "../../global/styles/theme";

const spinnerStyle = css`
  display: inline-block;
  border: 3px solid ${theme.colors.secondary['1']};
  border-radius: 50%;
  border-top-color: ${theme.colors.primary['4']};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
`;

const animation = css`
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const LoaderStyled = styled.div`
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

  .loading {
    width: 50px;
    height: 50px;
    ${spinnerStyle}
  }

  ${animation}
`;

export const LoaderMiniStyled = styled.div`
  margin-left: 10px;
  width: 18px;
  height: 18px;
  ${spinnerStyle}

  ${animation}
`;
