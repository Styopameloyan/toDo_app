import { Dialog, DialogContent, DialogTitle, Grid2, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';




class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offen: 0,
            inArbeit: 0,
            fertig: 0
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

                    <List >
                        <ListItem >
                            <span className='badge bg-secondary'>OFFENE</span>
                            <ListItemText primary={this.state.offen} />
                        </ListItem>
                        <ListItem >
                            <span className='badge bg-warning'>IN ARBEIT</span>
                            <ListItemText primary={this.state.inArbeit} />
                        </ListItem>
                        <ListItem >
                            <span className='badge bg-success'>FERTIG</span>
                            <ListItemText primary={this.state.fertig} />
                        </ListItem>
                    </List>

                </Grid2>



            </DialogContent>
        </Dialog>;
    }
}

export default UserProfile;