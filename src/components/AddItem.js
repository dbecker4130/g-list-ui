import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CommonPopover from './common/CommonPopover';
import { GET_LIST } from '../graphql/Queries';

import { 
  TextField, 
  Button, 
} from '@material-ui/core';

const AddItem = ({ listId }) => {
  const initialForm = { name: '', listId: listId };
  const [formState, setFormState] = useState(initialForm);
  const ADD_ITEM = gql`
    mutation addItem($itemName: String!, $listId: ID!) {
      addItem(name: $itemName, listId: $listId) {
        name
        listId
      }
    }
  `;
  const client = useApolloClient();
  const [createItem, { loading, error }] = useMutation(ADD_ITEM, {
    variables: {
      itemName: formState.name,
      listId: formState.listId
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: { listId }
      },
    ]
    // onCompleted({ sendItem }) {
    //   console.log('onCompleted()', sendItem);
    //   client.writeData({ data: { item: formState } })
    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p>An error occurred</p>;
    // }
  });
  
  return (
    <div>
      <CommonPopover
        buttonText="Add Item +"
        btnStyle={{ marginLeft: '1%', marginBottom: '2%' }}
        body={
          <div style={{
            display: 'inline-flex',
            minWidth: '100%'
            }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createItem();
                  setFormState(initialForm);
                }}
              >
                <TextField
                  autoFocus
                  size="small"
                  value={formState.name}
                  variant="outlined"
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <Button
                  type="submit"
                >
                  ADD +
                </Button>
              </form>
          </div>
        }
      />
    </div>
  )

}

export default AddItem;
