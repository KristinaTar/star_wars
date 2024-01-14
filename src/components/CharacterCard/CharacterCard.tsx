import React from "react";
import { Person } from "../../types/types";
import { CharacterCardStyled } from "./CharacterCard.styled";
import { Link } from "react-router-dom";

type Props = { person: Person };
const CharacterCard: React.FC<Props> = ({ person }) => {
  const characterId = person.url.split("/")[5];

  return (
    <Link to={`/character/${characterId}`}>
      <CharacterCardStyled>
        <h3 className="character-name">{person.name}</h3>
        <div className="character-attribute">Mass: {person.mass}</div>
        <div className="character-attribute">Birth: {person.birth_year}</div>
        <div className="character-attribute">Gender: {person.gender}</div>
      </CharacterCardStyled>
    </Link>
  );
};

export default CharacterCard;
