import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import ApolloClient from 'apollo-client';
import { 
  TextField, 
  Button,
} from '@material-ui/core';
import CommonPopover from './common/CommonPopover';
import { GET_BOARD } from '../graphql/Queries';

const AddList = ({ boardId }) => {
  const initialForm = { name: '' , boardId: boardId ? boardId.toString() : '' };
  const [formState, setFormState] = useState(initialForm);
  
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
    // onCompleted({ createList }) {
    //   console.log('onCompleted()', createList);
    //   // client.writeData({ data: { getItems: [sendItem]} })
    // }
  });

  return (
    <div style={{ margin: "0 auto", height: "100px" }}>
      <CommonPopover
        buttonText="Add a List +"
        body={
          <form
          onSubmit={(e) => {
            e.preventDefault();
            createList();
            setFormState(initialForm);
          }}
          >
            <TextField
              autoFocus
              value={formState.name}
              variant="outlined"
              onChange={(e) => setFormState({ ...formState, name: e.target.value, boardId: boardId })}
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

export default AddList;
