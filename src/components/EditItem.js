import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Button,
  TextField
} from '@material-ui/core';
import { Save, Undo, Cancel } from '@material-ui/icons';
import { GET_LIST } from '../graphql/Queries';

const EditItem = ({ selectedItem, listId, onComplete }) => {
  const initialForm = { id: selectedItem, name: '' };
  const [formState, setFormState] = useState(initialForm);
  
  const EDIT_ITEM = gql`
    mutation editItem($itemId: ID!, $itemName: String!) {
      editItem(id: $itemId, name: $itemName) {
        id
        name
      }
    }
  `;

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
        updateItem();
        setFormState(initialForm);
        onComplete();
      }}
    >
      <TextField
        size="small"
        value={formState.name}
        autoFocus
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

export default EditItem;
