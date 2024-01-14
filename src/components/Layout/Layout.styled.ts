import styled from 'styled-components';
import theme from "../../global/styles/theme";

export const LayoutStyled = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: url("https://lumiere-a.akamaihd.net/v1/images/swkids_starfield_background_a5e9ebd0.png?region=0%2C0%2C711%2C745");
  
  .layout {
    &-header {
      height: 100px;
      background: url("/images/Star_Wars_Logo.png") center no-repeat;
    }
    
    &-content {
      max-width: min(1280px, 90%);
      margin: 0 auto;
      padding: 30px 0;
      color: ${theme.colors.text["1"]};
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    border: none;
    border-radius: 3px;
    background-color: ${theme.colors.primary["2"]};
    color: ${theme.colors.text["1"]};
    padding: 10px 30px;
    cursor: pointer;
    transition: 0.5s;
    font-size: 15px;
    font-weight: 800;
    
    &:hover {
      background-color: ${theme.colors.primary["5"]};
    }
  }
`;