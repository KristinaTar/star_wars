import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPeople, getPeople, setStatus } from "../../store/peopleSlice";
import { StatusType } from "../../types/types";
import Loader from "../Loader";

const PeoplePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(getPeople);
  const status = useAppSelector(setStatus);

  if (status === StatusType.Loading) {
    return <Loader />
  }

  return (
    <div>
      {people.map(person => <div>{person.name}</div>)}
    </div>
  );
};

export default PeoplePage;
