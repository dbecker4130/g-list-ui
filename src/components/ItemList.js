import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const ItemList = () => {
    const [selectedItem, setSelectedItem] = useState('');
    console.log('selectedItem', selectedItem);
    
    const GET_ITEMS = gql`
        query getItems {
            getItems {
                id
                name
                desc
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
        <div style={{ width: "500px", height: "auto", border: "1px solid blue" }}>
            <h2>Item List</h2>
            <div >

            {data && data.getItems.map((item) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid red'}}>
                    <p>{item.name}</p>
                    <p>{item.desc}</p>
                    <button
                        onFocus={() => setSelectedItem(item.id)}
                        onClick={() => deleteItem()}
                    >
                        DELETE
                    </button>

                </div>
                ))}
            </div>
        </div>
    )
};

export default ItemList;
