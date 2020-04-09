import React from 'react';
import {
    AppBar,
    Typography,
    MenuItem,
    IconButton,
    Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
