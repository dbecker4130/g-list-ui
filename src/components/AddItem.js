import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ApolloClient from 'apollo-client';
import { TextField, Button } from '@material-ui/core';

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
        <div style={{ margin: "0 auto", height: "100px" }}>
            <TextField
                value={formState.name}
                variant="outlined"
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <Button
                onClick={() => sendItem()}
            >
                SEND
            </Button>
        </div>
    )

}

export default AddItem;
