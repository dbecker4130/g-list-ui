import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Card,
  Button,
  Popover,
  Typography,
  TextField
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddItem from './AddItem';
import EditItem from './EditItem';
import AddList from './AddList';
import { makeStyles } from '@material-ui/core/styles';
import CommonPopover from './common/CommonPopover';
import CommonDraggable from './common/CommonDraggable';
import CommonDraggableItem from './common/CommonDraggableItem';

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

const Lists = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [editMode, setEditMode] = useState('');
  console.log('editMode', editMode);
  
  console.log('selctredITem', selectedItem);

  const classes = useStyles();
  
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
    },
    refetchQueries: [
      {
        query: GET_LISTS,
      },
    ]
  });

  const { data, loading, error } = useQuery(GET_LISTS);
  console.log('LISTS', data);
    
  return (
    <div className={classes.root}>
      <h1>::Board Name::</h1>
      <div className="flexbox">
        <Grid container spacing={2}>
        {data && data.getLists.map((value) => (
          <Grid key={value} item xs={6} sm={3}>
            <Paper className={classes.paper}>
              {/* List menu */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CommonPopover
                  btnStyle={{ padding: 0, minWidth: '10px'}}
                  buttonText=""
                  icon={<MoreVert />}
                  body={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Button
                        onFocus={() => setSelectedList(value.id)}
                        onClick={() => deleteList()}
                      >
                        DELETE LIST
                      </Button>
                      <Button
                        // onFocus={() => setSelectedList(value.id)}
                        // onClick={() => deleteList()}
                      >
                        MOVE ->
                      </Button>
                    </div>
                  }
                />
              </div>
              {/* End List Menu */}
              <h2 style={{ textAlign: 'center' }}>{value.name}</h2>
                <CommonDraggable className="board" id={value.id}>
                {
                  value.items.map((item) => (
                    <CommonDraggableItem id={item.id} className="card" draggable="true">
                      <Card
                        className="handle"
                        onClick={() => setEditMode(item.id)}
                        style={{
                          border: '1px solid red',
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          height: 'auto',
                          margin: '1%', 
                        }}
                        raised
                      >
                        {
                          editMode === item.id ? (
                            <EditItem selectedItem={editMode} onComplete={() => setEditMode() } />
                          ) :
                          <p className={classes.name}>{item.name}</p>
                        }
                        <Button
                          className={classes.button}
                          onFocus={() => setSelectedItem(item.id)}
                          onClick={() => deleteItem()}
                        >
                          DELETE
                        </Button>
                      </Card>
                    </CommonDraggableItem>
                ))}
                </CommonDraggable>
              <AddItem listId={value.id} />
            </Paper>
          </Grid>
        ))}
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <AddList />
            </Paper>
            {/* <div className="flexbox">
              <CommonDraggable id="board-1" className="board">
                <CommonDraggableItem id="card-1" className="card" draggable="true">
                  <p>Card one</p>
                </CommonDraggableItem>
              </CommonDraggable>
              <CommonDraggable id="board-2" className="board">
                <CommonDraggableItem id="card-2" className="card" draggable="true">
                  <p>Card two</p>
                </CommonDraggableItem>
              </CommonDraggable>
            </div> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Lists;
export { GET_LISTS };
