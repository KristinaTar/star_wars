import React, { useEffect } from 'react';
import { useAppDispatch } from "./store/hooks";
import { getPeopleThunk } from "./store/peopleSlice";
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import PeoplePage from "./pages/PeoplePage";
import CharacterPage from "./pages/CharacterPage";
import { getFilmsThunk } from "./store/filmsSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeopleThunk());
    dispatch(getFilmsThunk());
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
