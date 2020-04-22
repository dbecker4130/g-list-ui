import React from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import AddList from './AddList';
import { makeStyles } from '@material-ui/core/styles';
import List from './List';
import { GET_BOARD } from '../graphql/Queries';

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
}));

const Lists = ({ board }) => {
  const classes = useStyles();
  const boardId = board ? board.id : null;
  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: { boardId }
  });

  console.log('GET_BOARD DATA', data);
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      {data && data.getBoard.lists.map((value) => (
        <Grid key={value} item xs={6} sm={3}>
          <List list={value} />
        </Grid>
      ))}
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <AddList boardId={boardId} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Lists;
