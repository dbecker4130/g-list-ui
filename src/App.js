import React from 'react';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <ItemList />
        <AddItem />
      </div>

    </div>
  );
}

export default App;
