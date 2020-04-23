import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Button
} from '@material-ui/core';
import {
  Save,
  Undo,
  Cancel
} from '@material-ui/icons';
import { GET_LIST, GET_BOARD } from '../../graphql/Queries';
import { EDIT_ITEM, EDIT_LIST, EDIT_BOARD } from '../../graphql/Mutations';
import CommonInput from './CommonInput';

const CommonEdit = ({ parentId, props, onComplete }) => {
  console.log('PROPS', props);
  
  const initialForm = {
    id: props.id,
    name: props.name,
  };
  const [formState, setFormState] = useState(initialForm);

  let boardId;
  let listId;

  if (props.__typename === 'Item' || props.__typename === 'List') {
    listId = parentId;
  } else {
    boardId = props.id
  }

  console.log('boardId', boardId);
  

  const [updateBoard, { boardLoading, boardError }] = useMutation(EDIT_BOARD, {
    variables: {
      boardId: formState.id,
      boardName: formState.name
    },
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { boardId }
      },
    ]
  });

  const [updateList, { listLoading, listError }] = useMutation(EDIT_LIST, {
    variables: {
      listId: formState.id,
      listName: formState.name
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: { listId }
      },
    ]
  });

  const [updateItem, { loading, error }] = useMutation(EDIT_ITEM, {
    variables: {
      itemId: formState.id,
      itemName: formState.name
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: { listId }
      },
    ]
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.__typename === 'List') {
          updateList();
        } else {
          updateBoard();
        }
        if (props.__typename === 'Item') {
          updateItem();
        } else {
          updateBoard();
        }
        setFormState(initialForm);
        onComplete();
      }}
    >
      <CommonInput
        value={formState.name}
        variant="outlined"
        onChange={(e) => setFormState({ ...formState, name: e.target.value })} 
      />
      <div>

      </div>
      <Button type="submit">
        <Save />
      </Button>
      <Button onClick={() => setFormState({ ...formState, name: '' })}>
        <Undo />
      </Button>
      <Button onClick={() => onComplete()}>
        <Cancel />
      </Button>
    </form>
  );
};

export default CommonEdit;
