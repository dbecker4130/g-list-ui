import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Card } from '@material-ui/core';
import AddItem from './AddItem';

const List = () => {
    const [selectedItem, setSelectedItem] = useState('');
    console.log('selectedItem', selectedItem);
    
    const GET_ITEMS = gql`
        query getItems {
            getItems {
                id
                name
            }
        }
    `;
    
    const DELETE_ITEM = gql`
    mutation deleteItem($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
    `;
    const [deleteItem, { errors }] = useMutation(DELETE_ITEM, {
        variables: {
            id: selectedItem,
        }
    });

    const { data, loading, error } = useQuery(GET_ITEMS);

    console.log('DATA', data);
    
    return (
        <Card 
            style={{ width: "500px", margin: "0 auto" }}
            variant="outlined"
        >
            <h2>LIST NAME</h2>
            {data && data.getItems.map((item) => (
                <Card 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        width: '90%', 
                        margin: '5%', 
                    }}
                    raised
                    variant="outlined"
                >
                    <p style={{ paddingLeft: "5%" }}>{item.name}</p>
                    <Button
                        onFocus={() => setSelectedItem(item.id)}
                        onClick={() => deleteItem()}
                    >
                        DELETE
                    </Button>

                </Card>
                ))}
            <AddItem />
        </Card>
    )
};

export default List;
