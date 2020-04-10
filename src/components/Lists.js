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
import AddList from './AddList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '15px',
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
      background: theme.palette.background.default,
    },
    name: {
        // border: '1px solid green',
        padding: '1%',
        width: '85%',
        margin: 0,
    },
    button: {
        padding: '0px',
        // border: '1px solid blue',
    },
  }));

const Lists = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedList, setSelectedList] = useState('');
    console.log('selctredITem', selectedItem);

    const classes = useStyles();
    
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
        <div className={classes.root}>
            <Grid container spacing={2}>
            {data && data.getLists.map((value) => (
                <Grid key={value} item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                        <h2 style={{ textAlign: 'center' }}>{value.name}</h2>
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
                                    // width: '90%', 
                                    height: 'auto',
                                    margin: '1%', 
                                }}
                                raised
                                // variant="outlined"
                            >
                                <p className={classes.name}>{item.name}</p>
                                <Button
                                    className={classes.button}
                                    onFocus={() => setSelectedItem(item.id)}
                                    onClick={() => deleteItem()}
                                >
                                    DELETE
                                </Button>

                            </Card>
                            ))
                        }
                        <AddItem listId={value.id} />
                    </Paper>
                </Grid>
            ))}
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                    <AddList />
                </Paper>
            </Grid>
            </Grid>
        </div>
    );
}

export default Lists;
