import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Button,
  TextField
} from '@material-ui/core';
import { Save, Undo, Cancel } from '@material-ui/icons';
import { GET_LIST } from '../graphql/Queries';
import { EDIT_ITEM } from '../graphql/Mutations';
import CommonInput from './common/CommonInput';

const EditItem = ({ selectedItem, listId, onComplete, props }) => {
  console.log('ssssss', props.__typename);
  
  const initialForm = { id: selectedItem, name: '' };
  const [formState, setFormState] = useState(initialForm);
  
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

export default EditItem;
