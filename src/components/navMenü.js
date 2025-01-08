import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false

        };
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            document.getElementById('logout').style.display = "none";
        }
    }
    logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    };

    render() {

        return (
            <div>
                <Box style={{ marginBottom: "10px" }}>
                    <AppBar color="primary">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                NEUE SYSTEM
                            </Typography>
                            <IconButton
                                id='logout'
                                size="large"
                                edge="end"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => this.logOut()}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>


            </div>
        );
    }
}

export default NavBar;
