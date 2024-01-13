import React, { useMemo, useState } from "react";
import ReactSelect from 'react-select';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPeople, setStatus } from "../../store/peopleSlice";
import { StatusType } from "../../types/types";
import Loader from "../Loader";
import Layout from "../Layout";
import { PeoplePageStyled } from "./PeoplePage.styled";
import CharacterCard from "../CharacterCard";
import { getFilms } from "../../store/filmsSlice";
import RadioSelect from "../RadioSelect";
import { useDebounce } from "./helpers/filterHelpers";

type Filters = {
  film: string | undefined,
  name: string | undefined,
  gender: string | undefined,
  minMass: number | undefined,
  maxMass: number | undefined,
}

const PeoplePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(getPeople);
  const status = useAppSelector(setStatus);
  const films = useAppSelector(getFilms);

  const [filters, setFilters] = useState<Filters>({
    film: undefined,
    name: undefined,
    gender: undefined,
    minMass: undefined,
    maxMass: undefined,
  });

  const setName = useDebounce(
    (name) => setFilters((prev) => ({...prev, name}))
  );
  const setMinMass = useDebounce(
    (minMass) => setFilters((prev) => (
      {...prev, minMass: Number(minMass)}
    ))
  );
  const setMaxMass = useDebounce(
    (maxMass) => setFilters((prev) => (
      {...prev, maxMass: Number(maxMass)}
    ))
  );

  const filteredPeople = useMemo(() => {
      const name = filters.name?.toLowerCase();
      return people.filter(person =>
        (!filters.film || person.films.includes(filters.film))
        && (!name || person.name.toLowerCase().includes(name))
        && (!filters.gender
          || person.gender === filters.gender
          || (filters.gender === 'other' && person.gender !== 'male' && person.gender !== 'female')
        )
        && (!filters.minMass || Number(person.mass) >= filters.minMass)
        && (!filters.maxMass || Number(person.mass) <= filters.maxMass)
      );
    },
    [people, filters]
  );

  return (
    <PeoplePageStyled>
      <div className="filters-container">
        <ReactSelect
          classNamePrefix="movies-select"
          options={films.map(film => ({
            label: film.title,
            value: film.url,
          }))}
          onChange={(movie) => {
            setFilters((prev) => ({
              ...prev, film: movie!.value
            }))
          }}
          placeholder="Movie name"
        />
        <RadioSelect
          value={filters.gender}
          options={['male', 'female', 'other']}
          onChange={(gender) => {
            setFilters((prev) => ({
              ...prev, gender
            }))
          }}
        />
        <input
          onChange={(e) => setName(e.target.value)}
          className="filter-input"
          placeholder="Name"
        />
        <input
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]+/g, '');
            setMinMass(e.target.value)
          }}
          className="filter-input filter-input--mass"
          placeholder="Min mass"
        />
        <input
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]+/g, '');
            setMaxMass(e.target.value)
          }}
          className="filter-input filter-input--mass"
          placeholder="Max mass"
        />
      </div>
      {status === StatusType.Loading ? <Loader/> : <div className="character-list">
        {filteredPeople.map(person => <CharacterCard person={person}/>)}
      </div>}
    </PeoplePageStyled>
  );
};

export default () => (<Layout><PeoplePage/></Layout>);
