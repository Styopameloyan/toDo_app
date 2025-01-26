import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Tooltip, } from '@mui/material';
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
            UserTodos: {},
        };
    }

    async componentDidMount() {
        this.setState({ user: JSON.parse(localStorage.getItem('User')) });
        const avatar = await TodoService.makeAvatar(this.state.user.displayName);
        this.setState({ avatar });
    }



    logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    };
    async handleClick() {
        const [error, data] = await TodoService.getTodos();
        if (error) {
            console.error(error.message);
        }
        const UserTodos = {

            offenCount: 0,
            inArbeitCount: 0,
            fertigCount: 0,
        }
        for (let i = 0; i < data.length; i++) {

            if (data[i].assignee === this.state.user.mail && data[i].status === "offen") {
                UserTodos.offenCount++;
            } else if (data[i].assignee === this.state.user.mail && data[i].status === "in arbeit") {
                UserTodos.inArbeitCount++;
            } else if (data[i].assignee === this.state.user.mail && data[i].status === "fertig") {
                UserTodos.fertigCount++;
            }
        }
        this.setState({
            open: true,
            UserTodos: UserTodos
        });
    }

    render() {

        return (
            <div>
                <Box>
                    <AppBar color="primary">
                        <Toolbar>
                            <Typography color="text.primary" variant="h6" sx={{ flexGrow: 1 }}>
                                NEUE SYSTEM
                            </Typography>

                            <Tooltip title="Theme">
                                <Brightness4Icon
                                    className="me-3"
                                    onClick={() => this.props.changeTheme()}
                                />
                            </Tooltip>
                            <Tooltip title="Logout">
                                <LogoutIcon
                                    className="ms-3"
                                    onClick={() => this.logOut()}
                                />
                            </Tooltip>
                            <Tooltip title="Profil" >
                                <Avatar onClick={() => this.handleClick()} className="ms-3">{this.state.avatar}</Avatar>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                </Box>
                <UserProfile UserTodos={this.state.UserTodos} user={this.state.user} open={this.state.open} close={() => this.setState({ open: false })} />
            </div>
        );
    }
}

export default NavBar;
