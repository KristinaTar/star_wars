import styled, { css } from 'styled-components';
import theme from "../../global/styles/theme";

const textStyle = css`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.32px;
`;

export const PeoplePageStyled = styled.div`
  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .filters-container {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }

  .filter-input {
    background-color: ${theme.colors.primary['1']};
    border-radius: 3px;
    border: solid 1px ${theme.colors.primary['2']};
    padding: 10px 16px;
    outline: none !important;
    color: ${theme.colors.text['1']};
    ${textStyle};

    &--mass {
      max-width: 100px;

      &::placeholder {
        font-size: 14px;
      }
    }
  }

  .movies-select {
    > input {
      pointer-events: none;
    }

    &__control {
      background-color: ${theme.colors.primary['1']};
      width: 100%;
      padding: 10px 16px;
      border-radius: 3px;
      border-color: ${theme.colors.primary['2']};
      cursor: pointer;

      &:hover {
        border-color: ${theme.colors.primary['5']};
      }
    }

    &__value-container {
      padding: 0;
      margin: 0;
      min-width: 170px;

      > div {
        padding: 0;
        margin: 0;
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__menu {
      background-color: ${theme.colors.primary['1']};
    }

    &__single-value {
      color: ${theme.colors.text['1']};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.32px;
    }

    &__option {
      color: ${theme.colors.text['1']};
      cursor: pointer;

      &:hover {
        background-color: ${theme.colors.primary['2']};
      }

      &--is-focused,
      &--is-selected {
        background-color: transparent;
      }

      &--is-selected {
        color: ${theme.colors.primary['5']};

        &:hover {
          color: ${theme.colors.text['1']};
          background-color: ${theme.colors.primary['2']};
        }
      }
    }
  }
`;