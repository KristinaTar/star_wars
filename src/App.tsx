import React, { useEffect } from 'react';
import PeoplePage from "./components/PeoplePage";
import { useAppDispatch } from "./store/hooks";
import { getPeopleThunk } from "./store/peopleSlice";
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import CharacterPage from "./components/CharacterPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeopleThunk());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" element={<PeoplePage/>}/>
        <Route path="/character/:id" element={<CharacterPage/>}/>
        <Route path="*" element={<PeoplePage/>}/>
      </Switch>
    </Router>
  );
}

export default App;
