import styled, { css } from 'styled-components';
import theme from "../../global/styles/theme";

const buttonStyle = css`
  border-radius: 3px;
  color: ${theme.colors.primary['2']} !important;

  &:hover {
    color: ${theme.colors.primary['5']} !important;
  }
`

export const PaginationStyles = styled('div')`
  padding-top: 30px;

  .ant-pagination {
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
      &-link > span {
        ${buttonStyle}
      }
      &-ellipsis {
        ${buttonStyle}
      }
      
      & > a {
        border-radius: 3px;
        color: ${theme.colors.primary['2']};

        &:hover {
          color: ${theme.colors.primary['4']};
          background-color: ${theme.colors.primary['2']};
        }
      }

      &-active {
        border: none;
        background: none;

        & > a {
          background-color: ${theme.colors.primary['5']};
          color: ${theme.colors.primary['4']};\
        }
      }
    }
  }

`;

export default PaginationStyles;
