import React, { useContext } from 'react';
import Lists from '../components/Lists';
import { BoardContext } from '../context/BoardContext';
import { Typography } from '@material-ui/core';

const Board = () => {
  const { board } = useContext(BoardContext);

  return (
    <div>
      <Typography variant="h2" style={{ textAlign: 'center', margin: '20px' }}>{board.name}</Typography>
      <Lists board={board} />
    </div>
  );
};

export default Board;
