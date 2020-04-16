import React, { useState } from 'react';
import {
  Paper,
  Card,
  Button,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddItem from './AddItem';
import EditItem from './EditItem';
import CommonPopover from './common/CommonPopover';
import { GET_LIST, GET_BOARD } from '../graphql/Queries';
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

const DELETE_LIST = gql`
mutation deleteList($id: ID!) {
  deleteList(id: $id) {
    id
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

const List = ({ list }) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const listId = list ? list.id : null;
  const boardId = list ? list.boardId : null;

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
  const { data } = useQuery(GET_LIST, {
    variables: {
      listId
    }
  });

  return (
    <Paper className={classes.paper}>
      {/* List nav menu */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CommonPopover
          btnStyle={{ padding: 0, minWidth: '10px'}}
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
      <h2 style={{ textAlign: 'center' }}>{list.name}</h2>

        {
          data && data.getList.items.map((item) => (
          <Card
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
                <EditItem 
                  selectedItem={editMode} 
                  listId={listId}
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
                      btnStyle={{ padding: 0, minWidth: '10px'}}
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
                        </div>
                      }
                      />
                  </div>
                </>
              )}
            <Button
              className={classes.button}
              onFocus={() => setSelectedItem(item.id)}
              onClick={() => deleteItem()}
            >
              DELETE
            </Button>
          </Card>
        ))}
      <AddItem listId={listId} />
    </Paper>
  );
}

export default List;
export { GET_LIST };