import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ApolloClient from 'apollo-client';

const AddItem = () => {
    const initialForm = {
        name: '',
        desc: ''
    };
    const [formState, setFormState] = useState(initialForm);
    const ADD_ITEM = gql`
        mutation addItem {
            addItem(name: "test", desc: "name") {
                name
                desc
            }
        }
    `;
    const client = useApolloClient();
    const [sendItem, { loading, error }] = useMutation(ADD_ITEM, {
        onCompleted({ sendItem }) {
            console.log('onCompleted()', sendItem);
            
        }
    });
    return (
        <div>
            <h2>Create an Item</h2>
            <input
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <input
                value={formState.desc}
                onChange={(e) => setFormState({ ...formState, desc: e.target.value })}
            />
            <button 
                onClick={() => sendItem()}
            >
                SEND
            </button>
        </div>
    )

}

export default AddItem;
