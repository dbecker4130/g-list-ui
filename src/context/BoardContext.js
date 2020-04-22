import React, { useState } from 'react';
import type { Node } from 'react';

const emptyBoard = {
  id: '',
  name: '',
};

let storedBoard = JSON.parse(window.localStorage.getItem('currentBoard'));
console.log('storedBoard', storedBoard);

const BoardContext = React.createContext({
  board: emptyBoard,
  setBoard: () => {},
});

type Props = {|
  children: Node,
|};

const BoardProvider = ({ children }: Props) => {
  const [board, setBoard] = useState(storedBoard !== null ? storedBoard : emptyBoard);

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
