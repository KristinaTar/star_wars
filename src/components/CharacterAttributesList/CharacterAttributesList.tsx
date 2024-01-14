import React from "react";
import { CharacterAttributesListStyled } from "./CharacterAttributesList.styled";
import LoaderMini from "../Loader/LoaderMini";

type Props = {
  title: string,
  loading?: boolean,
  list: string[],
}
const CharacterAttributesList: React.FC<Props> = ({title, list, loading = true}) => {
  return (
    <CharacterAttributesListStyled>
      <h4>
        {title}
        {loading
          ? <LoaderMini />
          : list.length === 0 && " - "
        }
      </h4>
      {list.length !== 0 && <ul>
        {list.map(item => <li>{item}</li>)}
      </ul>}
    </CharacterAttributesListStyled>
  );
};

export default CharacterAttributesList;
