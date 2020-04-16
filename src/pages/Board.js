import React from 'react';
import Lists from '../components/Lists';
import { useParams } from 'react-router-dom';

const Board = ({ boards }) => {
  let { boardName } = useParams();
  let tempBoard;
  if (boards) {
    tempBoard = boards.filter((board) => board.name === boardName)
  }
  return (
    <div>
      <h1 style={{ marginLeft: '5%' }}>Name: {boardName}</h1>
      <Lists board={tempBoard} />
    </div>
  );
};

export default Board;
