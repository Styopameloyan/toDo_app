import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AccordionActions, Backdrop, Button, CircularProgress, Dialog, Paper, Typography } from '@mui/material';
import Reg from './reg';
import { UserService } from '../services/User';
import { enqueueSnackbar } from "notistack";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwort: '',
            benutzername: '',
            showPassword: "password",
            email: '',
            loader: false,
            reg: false,
            open: false,
        }
    }
    async Login(e) {
        e.preventDefault();
        this.setState({ loader: true });
        const [error] = await UserService.login(this.state.email, this.state.passwort);
        if (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            this.setState({ loader: false });
        }
        else {
            enqueueSnackbar("Anmeldung hat geklappt.", { variant: "success" });
            this.setState({ loader: false });
            document.getElementById('logout').style.display = "block";
            this.props.handleLogin();
        }
    }
    openReg() {
        this.setState({ reg: true })
    }
    closeReg() {
        this.setState({ reg: false })
    }
    render() {
        return (<div style={{ marginTop: '200px' }}>
            <Dialog fullWidth onClose={() => this.closeReg()} open={this.state.reg}>
                <Reg closeReg={() => this.closeReg()} />
            </Dialog>
            <Paper style={{ maxWidth: '500px', margin: '0 auto' }} className="d-flex  mt-5 p-5 row  " >
                <Typography variant="h4" color="secondary" className="d-flex justify-content-center">
                    Login
                </Typography>

                <form className="d-flex flex-column align-items-center mt-5 gap-3" onSubmit={(e) => this.Login(e)}>
                    <div className="inputDiv" >
                        <input
                            required
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder="E-Mail"
                            size="small"
                        />
                    </div>
                    <div className="d-flex align-items-center inputDiv " >
                        <input
                            type={this.state.showPassword}
                            placeholder="Passwort"
                            className='flex-grow-1'

                            onChange={(e) => this.setState({ passwort: e.target.value })}
                        />
                        {this.state.showPassword ? (
                            <VisibilityIcon
                                onClick={() => this.setState({ showPassword: "" })} />
                        ) : (
                            <VisibilityOffIcon
                                onClick={() => this.setState({ showPassword: "password" })} />
                        )}
                    </div>
                    <AccordionActions className='buttonDIV'>
                        <Button type='submit' color='primary' variant="contained">Login</Button>
                        <Button onClick={() => this.openReg()} color='primary' variant="outlined">Registrieren</Button>
                    </AccordionActions>
                </form>
            </Paper>
            <Backdrop open={this.state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>);
    }
}

export default Login;
