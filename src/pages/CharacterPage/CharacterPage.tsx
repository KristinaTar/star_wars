import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getPerson,
  getPersonData, getPersonFilms, getPersonSpecies, getPersonStarships,
  getStatus,
} from "../../store/selectedPersonSlice";
import { StatusType } from "../../types/types";
import Loader from "../../components/Loader";
import ErrorPage from "../../components/ErrorPage";
import Layout from "../../components/Layout";
import CharacterAttributesList from "../../components/CharacterAttributesList";
import { CharacterPageStyled } from "./CharacterPage.styled";

const CharacterPage: React.FC = () => {
  const { id } = useParams();
  const status = useAppSelector(getStatus);
  const personData = useAppSelector(getPersonData);
  const filmsData = useAppSelector(getPersonFilms);
  const speciesData = useAppSelector(getPersonSpecies);
  const starShipsData = useAppSelector(getPersonStarships);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const _id = Number(id);
    if (isNaN(_id)) {
      navigate("/");
    }
    dispatch(getPerson(_id));
  }, [id, dispatch, navigate]);

  if (status.character === StatusType.Loading) {
    return <Loader />;
  } else if (
    status.character === StatusType.Error ||
    personData === undefined ||
    !personData
  ) {
    return <ErrorPage />;
  }

  return (
    <CharacterPageStyled>
      <h1 className="title">{personData.name}</h1>
      <div className="character-attributes">
        <div>Birth:</div>
        <div>{personData.birth_year}</div>
        <div>Height:</div>
        <div>{personData.height}</div>
        <div>Mass:</div>
        <div>{personData.mass}</div>
        <div>Hair color:</div>
        <div>{personData.hair_color}</div>
        <div>Skin color:</div>
        <div>{personData.skin_color}</div>
        <div>Eyes color:</div>
        <div>{personData.eye_color}</div>
      </div>
      <CharacterAttributesList
        loading={status.species === StatusType.Loading}
        title="Species"
        list={speciesData.map((specie) => specie.name)}
      />
      <CharacterAttributesList
        loading={status.films === StatusType.Loading}
        title="Movies"
        list={filmsData.map((film) => film.title)}
      />
      <CharacterAttributesList
        loading={status.starships === StatusType.Loading}
        title="Starships"
        list={starShipsData.map((starship) => starship.name)}
      />
    </CharacterPageStyled>
  );
};

export default function WrappedPage() {
  return (
    <Layout>
      <CharacterPage />
    </Layout>
  );
}
