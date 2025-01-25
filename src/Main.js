import React from 'react';
import App from './App';
import Login from './components/log';
import Menü from './components/navMenü';
import { UserService } from './services/User';
import { SnackbarProvider } from 'notistack';
import './css/reg.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            app: false,
            darkMode: false,
            ligth: createTheme(
                {
                    palette: {
                        mode: 'light', // Aktiviert ein helles Farbschema
                        primary: {
                            main: '#4b8b5f', // Kräftigeres Grün für primäre Elemente
                            contrastText: '#ffffff', // Weißer Text auf primären Elementen
                        },
                        secondary: {
                            main: '#76c78a', // Helleres, frisches Grün für sekundäre Elemente
                            contrastText: '#ffffff', // Weißer Text auf sekundären Elementen
                        },
                        background: {
                            default: '#f5fbf7', // Sehr helles Grünlich-Weiß für den Hintergrund
                            paper: '#e2f0e7', // Etwas dunklerer Hintergrund für Karten/Dialoge
                        },
                        text: {
                            primary: '#ffffff', // Tiefes, klares Grün für Haupttexte
                            secondary: '#568763', // Milderes Grün für weniger wichtige Texte
                            disabled: '#a1c4ab', // Sehr helles Grün für deaktivierte Texte
                        },
                        error: {
                            main: '#f0625d', // Warmer Rotton für Fehlermeldungen
                        },
                        warning: {
                            main: '#f5b54d', // Sonniges Orange für Warnungen
                        },
                        info: {
                            main: '#5aa1e8', // Kräftiges Blau für Informationsmeldungen
                        },
                        success: {
                            main: '#68a77c', // Sattes Grün für Erfolgsmeldungen
                        },
                    },
                    typography: {
                        allVariants: {
                            color: '#2a5133', // Dunkles Grün für alle Textvarianten
                        },
                    },
                }
            ),
            dark: createTheme({
                palette: {
                    mode: 'dark', // Aktiviert den Dark Mode
                    primary: {
                        main: '#90caf9', // Hauptfarbe (hellblau)
                        contrastText: '#ffffff', // Weißer Text auf primären Buttons
                    },
                    secondary: {
                        main: '#f48fb1', // Sekundärfarbe (rosa)
                        contrastText: '#ffffff', // Weißer Text auf sekundären Buttons
                    },
                    background: {
                        default: '#121212', // Hintergrundfarbe der App
                        paper: '#1e1e1e', // Hintergrundfarbe von Karten/Dialogen
                    },
                    text: {
                        primary: '#ffffff', // Standardfarbe für Texte
                        secondary: '#ffffff', // Sekundärfarbe für untergeordnete Texte
                        disabled: '#ffffff', // Farbe für deaktivierte Texte
                    },
                    error: {
                        main: '#f44336', // Rot für Fehlermeldungen
                    },
                    warning: {
                        main: '#ffa726', // Orange für Warnungen
                    },
                    info: {
                        main: '#29b6f6', // Blau für Infomeldungen
                    },
                    success: {
                        main: '#66bb6a', // Grün für Erfolgsmeldungen
                    },
                },
                typography: {
                    allVariants: {
                        color: '#ffffff', // Erzwingt Weiß für alle Textvarianten
                    },
                },
            }),
            currentTheme: {}

        }
    }
    componentDidMount() {
        const expired = UserService.checkTokenExpired();
        this.setState({ login: expired, app: !expired });
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") === "dark") {
                this.setState({ darkMode: true, currentTheme: this.state.dark });
            }
            else {
                this.setState({ darkMode: false, currentTheme: this.state.ligth });
            }
        }
    }
    handleLogin() {
        this.setState({ login: false, app: true })
    }

    changeTheme() {
        if (this.state.darkMode) {
            this.setState({ darkMode: false, currentTheme: this.state.ligth });
            localStorage.setItem("theme", "ligth");
        }
        else {
            this.setState({ darkMode: true, currentTheme: this.state.dark });
            localStorage.setItem("theme", "dark");
        }

    }
    render() {
        return <ThemeProvider theme={this.state.currentTheme}>
            <SnackbarProvider maxSnack={10} autoHideDuration={2500} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Menü changeTheme={() => this.changeTheme()} />
                {this.state.login ? <Login handleLogin={() => this.handleLogin()} /> : null}
                {this.state.app ? <App /> : null}
            </SnackbarProvider>
        </ThemeProvider>
    }
}


export default Main;





