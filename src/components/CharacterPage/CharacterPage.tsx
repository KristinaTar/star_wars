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

  if (status === StatusType.Loading) {
    return <Loader />;
  } else if (status === StatusType.Error) {
    return <ErrorPage />;
  } else if (personData === undefined) {
    return <div>Character not found</div>
  }

  return (
    personData && <div>
      CharacterPage: {personData.name}
    </div>
  );
};

export default CharacterPage;
