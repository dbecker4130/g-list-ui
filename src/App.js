import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Board from './pages/Board';
import Home from './pages/Home';
import './App.css';
import { GET_BOARDS } from './graphql/Queries';

function App() {
  const { data } = useQuery(GET_BOARDS);
  
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Navbar boards={data && data.getBoards} />
        <Switch>
          <Route exact path="/">
            <Home boards={data} />
          </Route>
          <Route path="/:boardName?">
            <Board boards={data && data.getBoards}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
