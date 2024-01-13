import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPerson, getPersonData, getStatus } from "../../store/selectedPersonSlice";
import { StatusType } from "../../types/types";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

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

  // todo  NOT found component

  if (status.character === StatusType.Loading) {
    return <Loader />;
  } else if (status.character === StatusType.Error) {
    return <ErrorPage />;
  } else if (personData === undefined || !personData.data) {
    return <div>Character not found</div>
  }

  return (
    <div>
      CharacterPage: {personData.data.name}{personData.films.map(el => el.title)}
    </div>
  );
};

export default CharacterPage;
