import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Delete } from '@material-ui/icons';
import AddBoard from '../components/AddBoard';
import { makeStyles } from '@material-ui/core/styles';
import { BoardContext } from '../context/BoardContext';
import { GET_BOARDS } from '../graphql/Queries';

const useStyles = makeStyles((theme) => ({
  root: {
    // border: '1px solid red',
    margin: '2% 5%',
    padding: '15px',
    flexGrow: 1,
  },
  grid: {
    // border: '1px solid blue',
    padding: '5%',
    // textAlign: 'center',
    margin: '0 auto'
  },
  paper: {
    width: '70%',
    // border: '1px solid blue',
    margin: '2% 0px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.background.default,
  },
}));

const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;

const Home = ({ boards }) => {
  const classes = useStyles();
  const { board, setBoard } = useContext(BoardContext);
  const [selectedBoard, setSelectedBoard] = useState('');

  const [deleteBoard, { deleteErrors }] = useMutation(DELETE_BOARD, {
    variables: {
      id: selectedBoard,
    },
    refetchQueries: [
      {
        query: GET_BOARDS,
      },
    ]
  });
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs className={classes.grid}>
          <Typography variant="h5">Current Board</Typography>
          <div>
            <Paper className={classes.paper}>
                {/* <Dashboard /> */}
                <p>{board.name}</p>
                <Button>
                  <Link
                    onClick={() => {
                      setBoard({ id: board.id, name: board.name })
                      window.localStorage.setItem('currentBoard', JSON.stringify({ id: board.id, name: board.name }));
                    }}
                    to={`/${board.name}`}
                  >
                    Go To Board
                  </Link>
                </Button>
              </Paper>
          </div>
        </Grid>
        <Grid item xs className={classes.grid}>
        <Typography variant="h5">Recent Boards</Typography>
          <div>
            {boards && boards.getBoards.map((board) => (
              <Paper className={classes.paper} key={board.id}>
                <Button
                  onFocus={() => setSelectedBoard(board.id)}
                  onClick={() => {
                    deleteBoard();
                  }}
                >
                  <Delete />
                </Button>
                <p>{board.name}</p>
                <Button>
                  <Link
                    onClick={() => {
                      setBoard({ id: board.id, name: board.name })
                      window.localStorage.setItem('currentBoard', JSON.stringify({ id: board.id, name: board.name }));
                    }}
                    to={`/${board.name}`}
                  >
                    Go To Board
                  </Link>
                </Button>
              </Paper>
            ))}
          </div>
        </Grid>
        <Grid key={board.id} item xs className={classes.grid}>
          <Typography variant="h5">Create Board</Typography>
          <Paper className={classes.paper}>
            <AddBoard />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
