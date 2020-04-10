import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CommonPopover from './common/CommonPopover';

import ApolloClient from 'apollo-client';
import { 
  TextField, 
  Button, 
  Typography
} from '@material-ui/core';

const AddItem = ({ listId }) => {
  const initialForm = { name: '', listId: listId };
  const [formState, setFormState] = useState(initialForm);
  console.log('formState', formState);
  const ADD_ITEM = gql`
    mutation addItem($itemName: String!, $listId: ID!) {
      addItem(name: $itemName, listId: $listId) {
        name
        listId
      }
    }
  `;
  const client = useApolloClient();
  const [sendItem, { loading, error }] = useMutation(ADD_ITEM, {
    variables: {
      itemName: formState.name,
      listId: formState.listId
    },
    onCompleted({ sendItem }) {
      console.log('onCompleted()', sendItem);
      // client.writeData({ data: { getItems: [sendItem]} })
    }
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
                  sendItem();
                }}
              >
                <TextField
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
