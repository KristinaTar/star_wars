import styled from 'styled-components';

export const PeoplePageStyled = styled.div`
  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
`;