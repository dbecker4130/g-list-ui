import React, { useState } from 'react';
import {
  Paper,
  Card,
  Button,
} from '@material-ui/core';
import { MoreVert, DeleteForever } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AddItem from './AddItem';
import EditItem from './EditItem';
import CommonPopover from './common/CommonPopover';
import CommonEdit from './common/CommonEdit';
import { GET_LIST, GET_BOARD, GET_LISTS } from '../graphql/Queries';
import { DELETE_LIST, DELETE_ITEM, MOVE_ITEM } from '../graphql/Mutations';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    background: theme.palette.background.default,
  },
  name: {
    padding: '1%',
    width: '85%',
    margin: 0,
  },
  button: {
    padding: '0px',
  },
}));

const List = ({ list }) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [moveToId, setMoveToId] = useState('');

  const listId = list ? list.id : null;
  const boardId = list ? list.boardId : null;
  console.log('BOARD ID', boardId);
  
  const [deleteList, { listErrors }] = useMutation(DELETE_LIST, {
    variables: {
      id: listId,
    },
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { boardId }
      },
    ]
  });
  
  const [deleteItem, { itemErrors }] = useMutation(DELETE_ITEM, {
    variables: {
      id: selectedItem,
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: { listId }
      },
    ]
  });

  const [moveItem, { moveItemErrors }] = useMutation(MOVE_ITEM, {
    variables: {
      itemId: selectedItem,
      listId: moveToId,
    },
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { boardId }
      },
    ]
  });
  const { data } = useQuery(GET_LIST, {
    variables: {
      listId
    }
  });

  const getLists = useQuery(GET_LISTS, {
    variables: {
      boardId
    }
  });

  const buttonStyle = {
    padding: 0,
    minWidth: '10px',
    maxHeight: '25px',
    // border: '1px solid red',
  };

  return (
    <Paper className={classes.paper}>
      {/* List nav menu */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CommonPopover
          btnStyle={buttonStyle}
          buttonText=""
          icon={<MoreVert />}
          body={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                onClick={() => deleteList()}
              >
                DELETE LIST
              </Button>
              <Button
              >
                MOVE ->
              </Button>
            </div>
          }
        />
      </div>
      {/* End List Menu */}
      {
        editMode === list.id ? (
          <CommonEdit
            props={list}
            parentId={listId}
            onComplete={() => {
              setEditMode('');
              console.log('EDIT MODE', editMode);
              
            }}
          />
        ) : (
          <h2 
            style={{ textAlign: 'center' }}
            onDoubleClick={() => setEditMode(list.id)}
          >
            {list.name}
          </h2>
        )
      }
        {
          data && data.getList.items.map((item) => (
          <Card
            key={item.id}
            onDoubleClick={() => setEditMode(item.id)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              height: 'auto',
              margin: '1%', 
            }}
            raised
          >
            {
              editMode === item.id ? (
                // <EditItem 
                //   selectedItem={editMode} 
                //   props={item}
                //   listId={listId}
                //   onComplete={() => {
                //     setEditMode('');
                //     console.log('EDIT MODE', editMode);
                    
                //   }}
                // />
                <CommonEdit
                  // selectedItem={editMode}
                  props={item}
                  parentId={listId}
                  onComplete={() => {
                    setEditMode('');
                    console.log('EDIT MODE', editMode);
                    
                  }}
                />
              ) : (
                <>
                  <p className={classes.name}>{item.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CommonPopover
                      btnStyle={buttonStyle}
                      buttonText=""
                      icon={<MoreVert />}
                      body={
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Button
                            onFocus={() => setSelectedItem(item.id)}
                            onClick={() => deleteItem()}
                            >
                            DELETE ITEM
                          </Button>
                          <Button
                            onClick={() => setEditMode(item.id)}
                            >
                            EDIT
                          </Button>
                          <CommonPopover
                            buttonText="MOVE TO"
                            body={
                              <div style={{ display: 'flex',  flexDirection: 'column' }}>
                                { getLists.data && getLists.data.getLists.map((list) => (
                                  <Button
                                    onFocus={() => { 
                                      setSelectedItem(item.id);
                                      setMoveToId(list.id);
                                    }}
                                    onClick={() => {
                                      moveItem();
                                    }}
                                  >
                                    {list.name}
                                  </Button>
                                ))
                                }
                              </div>
                          }
                          />
                        </div>
                      }
                      />
                  </div>
                </>
              )}
            <Button
              style={buttonStyle}
              className={classes.button}
              onFocus={() => setSelectedItem(item.id)}
              onClick={() => deleteItem()}
            >
              <DeleteForever />
            </Button>
          </Card>
        ))}
      <AddItem listId={listId} />
    </Paper>
  );
}

export default List;
