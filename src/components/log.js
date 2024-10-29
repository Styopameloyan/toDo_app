import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AccordionActions, Button, Paper, Typography } from '@mui/material';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwort: '',
            benutzername: '',
            showPassword: "password",
            alert: {
                open: false,
                message: '',
                severity: ''
            }
        }
    }




    render() {
        return (<div style={{ marginTop: '100px' }}>
            <Paper style={{ maxWidth: '500px', margin: '0 auto' }} className="d-flex  mt-5 p-5 row  " >
                <Typography variant="h4" color="secondary" className="d-flex justify-content-center">
                    Login
                </Typography>

                <form className="d-flex flex-column align-items-center mt-5 gap-3" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="inputDiv" >
                        <input
                            required
                            onChange={(e) => this.setState({ benutzername: e.target.value })}
                            placeholder="Benutzername"
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
                    </AccordionActions>
                </form>
            </Paper>
        </div>);
    }
}

export default Login;