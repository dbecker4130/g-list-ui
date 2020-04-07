import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ITEMS = gql`
    query getItems {
        getItems {
            name
            desc
        }
    }
`;

const ItemList = () => {
    const { data, loading, error } = useQuery(GET_ITEMS);

    console.log('DATA', data);
    
    // useEffect(() => {
    //     axios.get('http://localhost:4000')
    // }, [])
    
    return (
        <div style={{ width: "500px", height: "auto", border: "1px solid blue" }}>
            <h2>Item List</h2>
            {data && data.getItems.map((item) => (
                <div>
                    <p>{item.name}</p>
                    <p>{item.desc}</p>
                </div>
            ))}
        </div>
    )
};

export default ItemList;
