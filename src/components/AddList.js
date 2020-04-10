import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ApolloClient from 'apollo-client';
import { 
    TextField, 
    Button, 
    Popover,
    Typography
} from '@material-ui/core';

const AddList = () => {
    const initialForm = { name: '' };
    const [formState, setFormState] = useState(initialForm);
    const [anchorEl, setAnchorEl] = useState(null);
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

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    return (
        <div style={{ margin: "0 auto", height: "100px" }}>
            <Button onClick={handleClick}>
                Add List +
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
                >
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
            </Popover>
        </div>
    )

}

export default AddList