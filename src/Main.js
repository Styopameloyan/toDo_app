import React from 'react';
import App from './App';
import Reg from './components/reg';
import './css/reg.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/log';
import Menü from './components/navMenü';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reg: false,
            login: false,
            app: true,

        }
    }


    render() {
        const theme = createTheme({
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            // Default background color on hover
                            '&:hover': {
                                backgroundColor: '#449d00',  // Set your desired hover color here
                            },
                        },
                    },
                },
            },
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
            <Menü />
            {this.state.reg ? <Reg /> : null}
            {this.state.login ? <Login /> : null}
            {this.state.app ? <App /> : null}
        </ThemeProvider>;
    }
}


export default Main;

