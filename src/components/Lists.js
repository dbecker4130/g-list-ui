import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Box,
    Card,
    Button
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddItem from './AddItem';

const Lists = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedList, setSelectedList] = useState('');
    console.log('selctredITem', selectedItem);
    
    const GET_LISTS = gql`
        query getLists {
            getLists {
                id
                name
                items {
                    id
                    name
                }
            }
        }
    `;

    const DELETE_LIST = gql`
    mutation deleteList($id: ID!) {
        deleteList(id: $id) {
            id
        }
    }
    `;
    const [deleteList, { listErrors }] = useMutation(DELETE_LIST, {
        variables: {
            id: selectedList,
        }
    });

    const DELETE_ITEM = gql`
    mutation deleteItem($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
    `;
    const [deleteItem, { itemErrors }] = useMutation(DELETE_ITEM, {
        variables: {
            id: selectedItem,
        }
    });

    const { data, loading, error } = useQuery(GET_LISTS);
    console.log('LISTS', data);
    
    return (
        <div>
            <Grid container spacing={3}>
            {data && data.getLists.map((value) => (
                <Grid key={value} item xs={6} sm={3}>
                    <Paper>
                    <Card 
                        style={{ margin: "0 auto" }}
                        variant="outlined"
                    >
                        <h2>{value.name}</h2>
                        <Button
                            onFocus={() => setSelectedList(value.id)}
                            onClick={() => deleteList()}
                        >
                            DELETE LIST
                        </Button>

                        {
                            value.items.map((item) => (
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
                            ))
                        }
                        <AddItem listId={value.id} />
                    </Card>
                        
                    </Paper>
                </Grid>
            ))}
            </Grid>
        </div>
    );
}

export default Lists;
