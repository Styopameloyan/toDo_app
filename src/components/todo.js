import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, Typography, } from "@mui/material";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import { ExpandMore } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from './createDialog';


class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loader: false,
            expandet: false
        }

    }



    async delete() {
        this.setState({ loader: true })
        try {
            await fetch(`http://localhost:5000/todos/${this.props.item.id}`, { method: 'DELETE' })
            this.props.getData()
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ loader: false, open: false })
        }
    }


    async handleStatus() {
        let status = this.props.item.status

        if (this.props.item.status === "offen") {
            status = "fertig"
        } else {
            status = "offen"
        }

        try {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({ status: status }),
                headers: {
                    'Content-Type': 'application/json'   // Setzt den Content-Type auf JSON (je nach API-Anforderung)
                },
            }
            await fetch(`http://localhost:5000/todos/${this.props.item.id}`, requestOptions)
            this.props.getData()
        } catch (error) {
            console.error(error);
        }

    }



    render() {
        const status = this.props.item.status === "offen";
        return <>
            <Accordion expanded={this.state.expandet} >
                <AccordionSummary expandIcon={<ExpandMore onClick={() => this.setState({ expandet: !this.state.expandet })} />} >
                    <div className={`w-100 ${status ? "" : "text-decoration-line-through text-secondary"}`} onClick={() => this.setState({ expandet: !this.state.expandet })}>
                        <Typography variant='h6' >{this.props.item.title}</Typography>
                    </div>

                    <div className='d-flex align-items-center' >
                        <span className={`badge ${status ? "bg-secondary" : "bg-success"}`} >{this.props.item.status.toUpperCase()}</span>
                        <Checkbox checked={status ? false : true} onChange={() => this.handleStatus()} />

                        <CreateDialog action="update" getData={this.props.getData} item={this.props.item} />

                        <div style={{ width: "30px" }}>
                            {!status && <IconButton className='text-danger' onClick={() => this.setState({ open: true })} ><DeleteIcon /></IconButton>}
                        </div>
                    </div>

                </AccordionSummary>
                <Typography variant='subtitle2' style={{ fontWeight: "bold", marginLeft: "10px" }} >Beschreibung:</Typography>
                <AccordionDetails style={{ backgroundColor: "#f5f5f5", minHeight: "100px" }}>
                    {this.props.item.description}
                </AccordionDetails>
            </Accordion >

            {/* Löschen DIALOG */}
            <Dialog Dialog open={this.state.open} onClose={() => this.setState({ open: false })
            }>
                <DialogTitle>Todo wirklich Löschen?</DialogTitle>
                <DialogActions >
                    <Button variant='contained' onClick={() => this.delete()} >Löschen</Button>
                </DialogActions>

                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog >

        </>;
    }
}

export default Todo;