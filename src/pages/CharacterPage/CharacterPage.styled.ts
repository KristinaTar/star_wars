import styled from 'styled-components';
import theme from "../../global/styles/theme";

export const CharacterPageStyled = styled.div`
  margin: 0 auto;
  max-width: 400px;
  font-size: 18px;
  
  .title {
    margin-top: 0;
    text-align: center;
  }

  .character-attributes {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
`;