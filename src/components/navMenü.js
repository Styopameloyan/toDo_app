import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Box, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false

        };
    }



    render() {

        return (
            <div>
                <Box style={{ marginBottom: "20px" }}>
                    <AppBar color='secondary' >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon onClick={() => this.setState({ open: true })} />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                TODO
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <Drawer
                        anchor="left"
                        open={this.state.open}
                        onClose={() => this.setState({ open: false })}
                        PaperProps={{
                            sx: {
                                backgroundColor: '#198754',
                                color: 'white',
                                width: 250,
                            },
                        }}
                    >
                        <List sx={{ width: 250 }}>

                            <ListItem button style={{ justifyContent: "right" }} onClick={() => this.setState({ open: false })}>
                                <Typography color='white' variant="h6" sx={{ flexGrow: 1 }}>
                                    TODO
                                </Typography>
                                <ListItemIcon style={{ justifyContent: "right" }} >
                                    <CloseIcon />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Settings" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Drawer>
                </Box>


            </div>
        );
    }
}

export default NavBar;
