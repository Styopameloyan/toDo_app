import { Dialog, DialogContent, DialogTitle, Grid2, Typography } from '@mui/material';
import React from 'react';






class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        return <Dialog open={this.props.open} onClose={this.props.close}>
            <DialogTitle>Profil</DialogTitle>
            <DialogContent>
                <p>Name: {this.props.user.displayName} </p>
                <p>Email: {this.props.user.mail} </p>
                <Grid2 item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Meine Todos
                    </Typography>

                    <div className="d-flex row ">
                        <div className="gap-2">
                            <span className="badge bg-secondary">OFFENE {this.props.UserTodos.offenCount}</span>
                        </div>
                        <div className="gap-2">
                            <span className="badge bg-warning">IN ARBEIT {this.props.UserTodos.inArbeitCount}</span>
                        </div>
                        <div className="gap-2">
                            <span className="badge bg-success ">FERTIG {this.props.UserTodos.fertigCount}</span>
                        </div>
                    </div>
                </Grid2>
            </DialogContent>
        </Dialog>;
    }
}

export default UserProfile;