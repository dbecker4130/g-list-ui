import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import ApolloClient from 'apollo-client';
import { 
  TextField, 
  Button, 
  Typography
} from '@material-ui/core';
import CommonPopover from './common/CommonPopover';

const AddBoard = () => {
  const initialForm = { name: '' };
  const [formState, setFormState] = useState(initialForm);
  const CREATE_BOARD = gql`
    mutation addBoard($boardName: String!) {
      addBoard(name: $boardName) {
          name
      }
    }
  `;
//   const client = useApolloClient();
  const [createBoard, { loading, error }] = useMutation(CREATE_BOARD, {
    variables: {
      boardName: formState.name,
    },
    onCompleted({ createBoard }) {
      console.log('onCompleted()', createBoard);
      // client.writeData({ data: { getItems: [sendItem]} })
    }
  });

  return (
    <div style={{ margin: "0 auto", height: "100px" }}>
      <CommonPopover
        buttonText="Add a Board +"
        body={
          <>
            <Typography>Create a Board</Typography>
            <TextField
                value={formState.name}
                variant="outlined"
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <Button
                onClick={() => createBoard()}
            >
                SEND
            </Button>
          </>
        }
      />
    </div>
  );
};

export default AddBoard;
