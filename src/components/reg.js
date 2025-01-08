
import { AccordionActions, Backdrop, Button, CircularProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserService } from '../services/User';
import { enqueueSnackbar } from 'notistack';
import "../css/reg.css";
class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwort: '',
            passwort2: '',
            loader: false,
            displayname: '',
            email: '',
            showPassword: "password",
        }
    }


    handleSubmit(e) {
        e.preventDefault()
        const [error, message] = UserService.passCheck(this.state.passwort, this.state.passwort2);
        if (error) return enqueueSnackbar(message, { variant: "error" });
        this.createUser();
    }
    async createUser() {
        this.setState({ loader: true });
        const [error, data] = await UserService.register(this.state.email, this.state.passwort, this.state.displayname);
        if (error) enqueueSnackbar(error.message, { variant: "error" });
        else {
            enqueueSnackbar(`Benutzer ${data.displayName} wurde angelegt.`, { variant: "success" });
            this.props.closeReg();
        }
    }

    render() {

        return (<div className='regDiv' >
            <Paper style={{ margin: '0 auto' }} className="d-flex  mt-5 p-5 row  " >
                <Typography variant="h4" color="secondary" className="d-flex justify-content-center">
                    Konto Erstellen
                </Typography>
                <form className="d-flex flex-column align-items-center mt-5 gap-3" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='inputDiv'>
                        <input
                            required
                            onChange={(e) => this.setState({ displayname: e.target.value })}
                            placeholder="Benutzername"
                            size="small"
                        />
                    </div>
                    <div className='inputDiv'>
                        <input
                            required
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder="Email"
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
                    <div className="d-flex align-items-center inputDiv" >
                        <input
                            type={this.state.showPassword}
                            placeholder="Passwort wiederholen"
                            className='flex-grow-1'

                            onChange={(e) => this.setState({ passwort2: e.target.value })}
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
                        <Button type='submit' color='primary' variant="contained">Registrieren</Button>
                    </AccordionActions>
                </form>
            </Paper>
            <Backdrop open={this.state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Backdrop open={this.state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </div >);
    }
}

export default Reg;