import React from 'react';
import {
    AppBar,
    Typography,
    Link,
    MenuItem,
    IconButton,
    Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: '#c2d6d6', width: '100%' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>
                        <Link
                            color="inherit"
                            style={{
                                fontFamily: "Pacifico"
                            }}
                            >
                            G-List
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
