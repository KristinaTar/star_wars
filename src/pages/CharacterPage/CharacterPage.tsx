import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPerson, getPersonData, getStatus } from "../../store/selectedPersonSlice";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const _id = Number(id);
    if (isNaN(_id)) {
      navigate("/");
    }
    dispatch(getPerson(_id));
  }, [id]);

  if (status.character === StatusType.Loading) {
    return <Loader />;
  } else if (
    status.character === StatusType.Error
    || personData === undefined
    || !personData.data
  ) {
    return <ErrorPage />;
  }

  return (
    <CharacterPageStyled>
      <h1 className="title">{personData.data.name}</h1>
      <CharacterAttributesList
        loading={status.species === StatusType.Loading}
        title="Species"
        list={personData.species.map(specie => specie.name)}
      />
      <CharacterAttributesList
        loading={status.films === StatusType.Loading}
        title="Movies"
        list={personData.films.map(film => film.title)}
      />
      <CharacterAttributesList
        loading={status.starships === StatusType.Loading}
        title="Starships"
        list={personData.starships.map(starship => starship.name)}
      />
    </CharacterPageStyled>
  );
};

export default () => (<Layout><CharacterPage/></Layout>);