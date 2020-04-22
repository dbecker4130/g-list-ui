import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import ApolloClient from 'apollo-client';
import { 
  TextField, 
  Button,
} from '@material-ui/core';
import CommonPopover from './common/CommonPopover';
import CommonInput from './common/CommonInput';
import { GET_BOARD } from '../graphql/Queries';

const AddList = ({ boardId }) => {
  const initialForm = { name: '' , boardId: boardId ? boardId.toString() : '' };
  const [formState, setFormState] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
  console.log('errorMessage', errorMessage);
  
  const CREATE_LIST = gql`
    mutation addList($listName: String!, $boardId: ID!) {
      addList(name: $listName, boardId: $boardId) {
          name
          boardId
      }
    }
  `;
  // const client = useApolloClient();
  const [createList, { loading, error }] = useMutation(CREATE_LIST, {
    variables: {
      listName: formState.name,
      boardId: formState.boardId
    },
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { boardId }
      },
    ],
    onError(error) {
      console.log('ERROR', error.message);
      setErrorMessage('name required');
    }
    // onCompleted({ createList }) {
    //   // client.writeData({ data: { getItems: [sendItem]} })
    // }
  });

  if (error) {
    console.log('ERROR.MESSAGE', error.message);
  }
  

  return (
    <div style={{ margin: "0 auto", height: "100px" }}>
      <CommonPopover
        buttonText="Add a List +"
        body={
          <form
            style={{ display: 'block', height: '100px', width: '215px' }}
            onSubmit={(e) => {
              e.preventDefault();
              createList();
              setFormState(initialForm);
            }}
          >
            <CommonInput
              error={errorMessage ? true : false}
              label={errorMessage ? errorMessage : "create a list"}
              autoFocus
              value={formState.name}
              onChange={(e) => {
                setErrorMessage('');
                setFormState({ ...formState, name: e.target.value, boardId: boardId });
              }}
            />
            <Button
              type="submit"
              style={{ float: 'right' }}
            >
              SEND
            </Button>
          </form>
        }
      />
    </div>
  );
};

export default AddList;
