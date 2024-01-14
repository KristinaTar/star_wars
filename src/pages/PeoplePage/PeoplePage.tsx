import React, { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { useAppSelector } from "../../store/hooks";
import { getPeople, setStatus } from "../../store/peopleSlice";
import { StatusType } from "../../types/types";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import { PeoplePageStyled } from "./PeoplePage.styled";
import CharacterCard from "../../components/CharacterCard";
import { getFilms } from "../../store/filmsSlice";
import RadioSelect from "../../components/RadioSelect";
import { useDebounce } from "./helpers/filterHelpers";
import Pagination from "../../components/Pagination/Pagination";
import ErrorPage from "../../components/ErrorPage";

type Filters = {
  film: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  minMass: number | undefined;
  maxMass: number | undefined;
};

const initialFilters = {
  film: undefined,
  name: undefined,
  gender: undefined,
  minMass: undefined,
  maxMass: undefined,
};

const PAGE_SIZE = window.innerWidth <= 720 ? 8 : 9;

const PeoplePage: React.FC = () => {
  const people = useAppSelector(getPeople);
  const status = useAppSelector(setStatus);
  const films = useAppSelector(getFilms);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useDebounce((name) =>
    setFilters((prev) => ({ ...prev, name })),
  );
  const [minMass, setMinMass] = useDebounce((minMass) =>
    setFilters((prev) => ({ ...prev, minMass: Number(minMass) })),
  );
  const [maxMass, setMaxMass] = useDebounce((maxMass) =>
    setFilters((prev) => ({ ...prev, maxMass: Number(maxMass) })),
  );

  const filteredPeople = useMemo(() => {
    const name = filters.name?.toLowerCase();
    return people.filter(
      (person) =>
        (!filters.film || person.films.includes(filters.film)) &&
        (!name || person.name.toLowerCase().includes(name)) &&
        (!filters.gender ||
          person.gender === filters.gender ||
          (filters.gender === "other" &&
            person.gender !== "male" &&
            person.gender !== "female")) &&
        (!filters.minMass || Number(person.mass) >= filters.minMass) &&
        (!filters.maxMass || Number(person.mass) <= filters.maxMass),
    );
  }, [people, filters]);

  const paginatedPeople = useMemo(() => {
    return filteredPeople.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );
  }, [filteredPeople, currentPage]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
    // resetting debounce
    setName("");
    setMinMass("");
    setMaxMass("");
  };

  const movieValue = useMemo(() => {
    const movie = films.find((film) => film.url === filters.film);
    if (!movie) return null;
    return {
      label: movie.title,
      value: filters.film,
    };
  }, [films, filters.film]);

  if (status === StatusType.Error) return <ErrorPage />;

  console.log({
    test:
      paginatedPeople.length < PAGE_SIZE
        ? new Array(PAGE_SIZE - paginatedPeople.length).fill(<div />)
        : [],
  });

  return (
    <PeoplePageStyled>
      <div className="filters-container">
        <ReactSelect
          className="movies-select flex-item"
          value={movieValue}
          classNamePrefix="movies-select"
          options={films.map((film) => ({
            label: film.title,
            value: film.url,
          }))}
          onChange={(movie) => {
            setFilters((prev) => ({
              ...prev,
              film: movie!.value,
            }));
          }}
          placeholder="Movie name"
        />
        <RadioSelect
          value={filters.gender}
          options={["male", "female", "other"]}
          onChange={(gender) => {
            setFilters((prev) => ({
              ...prev,
              gender,
            }));
          }}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="filter-input flex-item"
          placeholder="Name"
        />
        <div className="mass-container">
          <input
            value={minMass}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]+/g, "");
              setMinMass(e.target.value);
            }}
            className="filter-input filter-input--mass"
            placeholder="Min mass"
          />
          <input
            value={maxMass}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]+/g, "");
              setMaxMass(e.target.value);
            }}
            className="filter-input filter-input--mass"
            placeholder="Max mass"
          />
        </div>
        <button className="flex-item" type="button" onClick={resetFilters}>
          Reset
        </button>
      </div>
      {status === StatusType.Loading && filteredPeople.length === 0 ? (
        <Loader />
      ) : (
        <div className="character-list">
          {paginatedPeople
            .map((person) => (
              <div key={person.url}>
                <CharacterCard person={person} />
              </div>
            ))
            .concat(
              paginatedPeople.length < PAGE_SIZE
                ? new Array(PAGE_SIZE - paginatedPeople.length).fill(<div />)
                : [],
            )}
        </div>
      )}
      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={filteredPeople.length}
        onChange={setCurrentPage}
      />
    </PeoplePageStyled>
  );
};

export default function WrappedPage() {
  return (
    <Layout>
      <PeoplePage />
    </Layout>
  );
}
