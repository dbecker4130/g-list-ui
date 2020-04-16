import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
} from '@material-ui/core';
import AddBoard from '../components/AddBoard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    flexGrow: 1,
  },
  paper: {
    width: '30%',
    border: '1px solid red',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.background.default,
  },
}));

const Home = ({ boards }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <h2>Recent Boards</h2>
      <div>
        {boards && boards.getBoards.map((value) => (
          <Paper className={classes.paper}>
            <p>{value.name}</p>
            <Button>
              <Link to={`/${value.name}`}>
                Go To Board
              </Link>
            </Button>
          </Paper>
        ))}
      </div>
      <AddBoard />
    </div>
  );
};

export default Home;
