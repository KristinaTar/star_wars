import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPeople, getPeople, setStatus } from "../../store/peopleSlice";
import { StatusType } from "../../types/types";
import Loader from "../Loader";
import Layout from "../Layout";
import { PeoplePageStyled } from "./PeoplePage.styled";
import CharacterCard from "../CharacterCard";

const PeoplePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(getPeople);
  const status = useAppSelector(setStatus);

  if (status === StatusType.Loading) {
    return <Loader />
  }

  return (
    <PeoplePageStyled>
      <div className="filters">

      </div>
      <div className="character-list">
        {people.map(person => <CharacterCard person={person} />)}
      </div>
    </PeoplePageStyled>
  );
};

export default () => (<Layout><PeoplePage/></Layout>);
