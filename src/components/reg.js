
import { AccordionActions, Alert, Backdrop, Button, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "../css/reg.css";



class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwort: '',
            passwort2: '',
            loader: false,
            benutzername: '',
            email: '',
            showPassword: "password",
            alert: {
                open: false,
                message: '',
                severity: ''
            },


        }
    }


    handleSubmit(e) {
        e.preventDefault()
        this.handlePassCheck()

    }

    handlePassCheck() {

        let success = { open: true, message: 'Regiestrierung Erfolgreich', severity: 'success' }
        let error = { open: true, message: '', severity: 'error' }

        if (this.state.passwort === this.state.passwort2) {
            if (/[A-Z]/.test(this.state.passwort)) {
                if (/[!@#$%^&*(),.?":{}|<>]/.test(this.state.passwort)) {
                    if (/[0-9]/.test(this.state.passwort)) {
                        this.handleAlertClose(success)
                    } else {
                        error.message = "Passwort muss min. 1 Ziffer enthalten"
                        this.handleAlertClose(error)
                        return
                    }
                } else {
                    error.message = "Passwort muss min. 1 Sonderzeichen enthalten"
                    this.handleAlertClose(error)
                    return
                }
            } else {
                error.message = "Passwort muss min. 1 Großbuchstaben enthalten"
                this.handleAlertClose(error)
                return
            }
            this.handleAlertClose(success)
        } else {
            error.message = "Passwörter stimmen nicht überein"
            this.handleAlertClose(error)
        }
    }


    handleAlertClose(message,) {
        this.setState({ alert: message })
        setTimeout(() => {
            this.setState({ alert: { open: false } })
        }, 3000)
    }





    render() {

        return (<div className='regDiv' >
            <Paper style={{ maxWidth: '500px', margin: '0 auto' }} className="d-flex  mt-5 p-5 row  " >
                <Typography variant="h4" color="secondary" className="d-flex justify-content-center">
                    Konto Erstellen
                </Typography>

                <form className="d-flex flex-column align-items-center mt-5 gap-3" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='inputDiv'>
                        <input
                            required
                            onChange={(e) => this.setState({ benutzername: e.target.value })}
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
            {this.state.alert.open && (
                <Alert className='mt-2 alert' severity={this.state.alert.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                this.setState({ alert: { open: false } });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {this.state.alert.message}
                </Alert>
            )}


        </div>);
    }
}

export default Reg;