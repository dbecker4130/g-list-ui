import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ApolloClient from 'apollo-client';
import { 
  TextField, 
  Button, 
  Typography
} from '@material-ui/core';
import CommonPopover from './common/CommonPopover';

const AddList = () => {
  const initialForm = { name: '' };
  const [formState, setFormState] = useState(initialForm);
  const CREATE_LIST = gql`
    mutation addList($listName: String!) {
      addList(name: $listName) {
          name
      }
    }
  `;
  const client = useApolloClient();
  const [createList, { loading, error }] = useMutation(CREATE_LIST, {
    variables: {
      listName: formState.name,
    },
    onCompleted({ createList }) {
      console.log('onCompleted()', createList);
      // client.writeData({ data: { getItems: [sendItem]} })
    }
  });

  return (
    <div style={{ margin: "0 auto", height: "100px" }}>
      <CommonPopover
        buttonText="Add a List +"
        body={
          <>
            <Typography>Create a List</Typography>
            <TextField
                value={formState.name}
                variant="outlined"
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <Button
                onClick={() => createList()}
            >
                SEND
            </Button>
          </>
        }
      />
    </div>
  );
};

export default AddList;
