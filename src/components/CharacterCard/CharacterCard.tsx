import React, { useEffect } from "react";
import { Person } from "../../types/types";
import { CharacterCardStyled } from "./CharacterCard.styled";
import { Link } from "react-router-dom";

type Props = { person: Person }
const CharacterCard: React.FC<Props> = ({person}) => {
  const characterId = person.url.split('/')[5];

  return (
    <Link to={`/character/${characterId}`}>
      <CharacterCardStyled>
        <div>
          Name: {person.name}
        </div>
        <div>
          Mass: {person.mass}
        </div>
        <div>
          Birth: {person.birth_year}
        </div>
      </CharacterCardStyled>
    </Link>
  );
};

export default CharacterCard;
