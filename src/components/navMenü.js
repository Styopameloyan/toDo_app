import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { TodoService } from '../services/Todo';
import UserProfile from './UserProfile';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            avatar: "",
            user: JSON.parse(localStorage.getItem('User')),

        };
    }

    async componentDidMount() {
        if (!localStorage.getItem('token')) {
            document.getElementById('logout').style.display = "none";
        }
        let avatar = await TodoService.makeAvatar(this.state.user.displayName);
        this.setState({ avatar });

    }
    logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    };

    render() {

        return (
            <div>
                <Box>
                    <AppBar color="primary">
                        <Toolbar>
                            <Typography color="text.primary" variant="h6" sx={{ flexGrow: 1 }}>
                                NEUE SYSTEM
                            </Typography>

                            <Brightness4Icon
                                className="me-3"
                                onClick={() => this.props.changeTheme()}
                            />
                            <LogoutIcon
                                className="ms-3"
                                id="logout"
                                onClick={() => this.logOut()}
                            />


                            <Avatar onClick={() => this.setState({ open: true })} className="ms-3">{this.state.avatar}</Avatar>

                        </Toolbar>
                    </AppBar>
                </Box>
                <UserProfile user={this.state.user} open={this.state.open} close={() => this.setState({ open: false })} />
            </div>
        );
    }
}

export default NavBar;
