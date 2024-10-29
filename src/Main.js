import React from 'react';
import App from './App';
import Reg from './components/reg';
import './css/reg.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './components/log';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reg: true,
            login: true,
            app: true

        }

    }

    render() {
        const theme = createTheme({
            palette: {
                type: 'dark',
                primary: {
                    main: '#198754  ',
                },
                secondary: {
                    main: '#1A4C3C',
                },
            },
        });
        return <ThemeProvider theme={theme}>
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
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TODO
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>
            {this.state.reg ? <Reg /> : null}
            {this.state.login ? <Login /> : null}
            {this.state.app ? <App /> : null}


        </ThemeProvider>;
    }
}


export default Main;

