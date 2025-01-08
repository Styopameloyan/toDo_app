import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, Typography, } from "@mui/material";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import { ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from './createDialog';
import { TodoService } from '../services/Todo';
import { enqueueSnackbar } from 'notistack';
import "../css/todo.css"
class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loader: false,
            expandet: false
        }

    }
    async componentDidMount() {

    }
    async delete() {
        this.setState({ loader: true })
        const [error] = await TodoService.deleteTodo(this.props.item.rowid);
        if (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
        enqueueSnackbar('Todo erfolgreich gelöscht', { variant: 'success' });
        this.props.getData()
        this.setState({ loader: false, open: false });
    }
    async handleStatus() {
        let status = this.props.item.status
        this.setState({ loader: true })
        if (this.props.item.status === "offen") {
            status = "fertig"
            const [error] = await TodoService.updateTodo(this.props.item.rowid, status);
            if (error) {
                console.error(error);
                enqueueSnackbar(error.message, { variant: "error" });
            }
        } else {
            status = "offen"
            const [error] = await TodoService.updateTodo(this.props.item.rowid, status);
            if (error) {
                console.error(error);
                enqueueSnackbar(error.message, { variant: "error" });
            }
        }
        enqueueSnackbar('Status erfolgreich geupdated', { variant: 'success' });
        this.props.getData()
        this.setState({ loader: false });
    }
    render() {
        const status = this.props.item.status === "offen";


        return <>
            <Accordion className="accordion" expanded={this.state.expandet} >
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
                    <Typography variant="subtitle2" style={{ fontWeight: "bold", }}>
                        Beschreibung:
                    </Typography>
                    <Typography variant="subtitle2" style={{ fontWeight: "bold", }}>
                        Ersteller:{this.props.item.ersteller}
                    </Typography>
                </div>

                <AccordionDetails className="accordion-details" style={{ backgroundColor: "#f5f5f5", minHeight: "100px" }}>
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