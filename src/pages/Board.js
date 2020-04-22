import React, { useContext } from 'react';
import Lists from '../components/Lists';
import { BoardContext } from '../context/BoardContext';

const Board = () => {
  const { board } = useContext(BoardContext);

  return (
    <div>
      <h1 style={{ marginLeft: '5%' }}>Name: {board.name}</h1>
      <Lists board={board} />
    </div>
  );
};

export default Board;
