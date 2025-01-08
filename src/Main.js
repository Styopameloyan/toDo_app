import React from 'react';
import App from './App';
import Login from './components/log';
import Menü from './components/navMenü';
import { UserService } from './services/User';
import { SnackbarProvider } from 'notistack';
import './css/reg.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            app: false,

        }
    }
    componentDidMount() {
        const expired = UserService.checkTokenExpired();
        this.setState({ login: expired, app: !expired });
    }
    handleLogin() {
        this.setState({ login: false, app: true })
    }
    render() {

        return <SnackbarProvider maxSnack={10} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Menü />
            {this.state.login ? <Login handleLogin={() => this.handleLogin()} /> : null}
            {this.state.app ? <App /> : null}
        </SnackbarProvider>
    }
}


export default Main;





