import React, { useEffect } from 'react';
import './App.css';
import PeoplePage from "./components/PeoplePage/PeoplePage";
import { useAppDispatch } from "./store/hooks";
import { getPeopleThunk } from "./store/peopleSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeopleThunk());
  }, []);

  return (
    <div className="App">
      <PeoplePage />
    </div>
  );
}

export default App;
