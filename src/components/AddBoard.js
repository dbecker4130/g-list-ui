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
import CommonInput from './common/CommonInput';
import { GET_BOARDS } from '../graphql/Queries';

const AddBoard = () => {
  const initialForm = { name: '' };
  const [formState, setFormState] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
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
    refetchQueries: [
      {
        query: GET_BOARDS
      }
    ],
    onCompleted({ createBoard }) {
      console.log('onCompleted()', createBoard);
      // client.writeData({ data: { getItems: [sendItem]} })
    },
    onError(error) {
      console.log('ERROR', error.message);
      setErrorMessage('name required');
    }
  });

  return (
    <div style={{ margin: "0 auto", height: "auto" }}>
      <CommonPopover
        buttonText="Add a Board +"
        body={
          <form
          onSubmit={(e) => {
            e.preventDefault();
            createBoard();
            setFormState(initialForm);
          }}
          
          >
            <CommonInput
              error={errorMessage ? true : false}
              label={errorMessage ? errorMessage : "create a board"}
              autoFocus
              value={formState.name}
              variant="outlined"
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
                setErrorMessage('');
              }}
            />
            <Button
              type="submit"
            >
              SEND
            </Button>
          </form>
        }
      />
    </div>
  );
};

export default AddBoard;
