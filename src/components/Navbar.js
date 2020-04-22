import React, { useState, useContext } from 'react';
import {
    AppBar,
    MenuItem,
    Menu,
    IconButton,
    Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';

const Navbar = ({ boards }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { board, setBoard } = useContext(BoardContext);
  console.log('BOard on NAV', board);
  
  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#c2d6d6', width: '100%' }}>
        <Toolbar>
          <IconButton
            onClick={openMenu}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {
              boards && boards.map((board) => (
                <Link 
                  to={`/${board.name}`}
                  onClick={() => {
                    setBoard({ id: board.id, name: board.name })
                    window.localStorage.setItem('currentBoard', JSON.stringify({ id: board.id, name: board.name }));
                    closeMenu()
                  }}
                  style={{
                    color: '#000',
                    textDecoration: "none",
                  }}
                  >
                  <MenuItem>
                      {board.name}
                  </MenuItem>
                </Link>
              ))
            }
          </Menu>
          <Link
            to="/"
            style={{
              color: "#f3f3f3",
              textDecoration: "none",
              fontFamily: "Pacifico"
            }}
            >
            G-List
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
