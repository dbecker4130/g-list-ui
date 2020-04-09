import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Navbar from './Navbar';
import List from './List';
import Lists from './Lists';
import ApolloClient from 'apollo-client';
import { TextField, Button } from '@material-ui/core';

const Board = () => {
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
        <div style={{ width: "100%" }}>
            <Navbar />
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
            <Lists />
        </div>
    )

}

export default Board;
