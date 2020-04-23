import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Lists from '../components/Lists';
import CommonEdit from '../components/common/CommonEdit';
import { BoardContext } from '../context/BoardContext';
import { Typography } from '@material-ui/core';
import { GET_BOARD } from '../graphql/Queries';

const Board = () => {
  const { board } = useContext(BoardContext);
  const [editMode, setEditMode] = useState('');
  const boardId = board ? board.id : null;
  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: { boardId }
  });
  console.log('DATA', data);
  
  return (
    <div>
      {
        editMode === board.id ? (
          <CommonEdit
            props={board}
            parentId={board.id}
            onComplete={() => {
              setEditMode('');
              console.log('EDIT MODE', editMode);
            }}
          />
        ) : (
          <Typography 
            variant="h2" 
            style={{ textAlign: 'center', margin: '20px' }}
            onDoubleClick={() => setEditMode(board.id)}
          >
            {data && data.getBoard.name}
          </Typography>
        )
      }
      <Lists board={board} />
    </div>
  );
};

export default Board;
