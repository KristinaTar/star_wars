import styled from 'styled-components';
import theme from "../../global/styles/theme";

export const RadioSelectStyled = styled.div`
  .radio {
    color: ${theme.colors.text['1']};
    padding: 2.5px;

    &-element {
      content: "";
      height: 11px;
      width: 11px;
      background-color: ${theme.colors.primary['3']};
      border-radius: 16px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin-right: 10px;
      &:checked {
        background-color: ${theme.colors.primary['2']};
      }
    }
    &-label {
      line-height: 1px;
      cursor: pointer;
      display: block;
    }
  }
`;