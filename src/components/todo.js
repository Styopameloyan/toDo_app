import React from 'react';
import { Accordion, AccordionSummary, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, Typography, } from "@mui/material";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import { ExpandMore, } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from './createDialog';
import SetAssignee from './assignee';
import { TodoService } from '../services/Todo';
import { enqueueSnackbar } from 'notistack';
import "../css/todo.css"
import History from './history';
import { UserService } from '../services/User';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loader: false,
            expandet: false,
            avatar: "",
            data: []
        }
    }
    async componentDidMount() {
        const [error, data] = await UserService.find();
        if (error) {
            console.log(error);
        }
        this.setState({ data: data })
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
    async handleStatus(value) {

        this.setState({ loader: true });
        const [error] = await TodoService.updateTodo(this.props.item.rowid, value);
        if (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: "error" });
            this.setState({ loader: false });
            return;
        }
        enqueueSnackbar("Status erfolgreich geupdated", { variant: "success" });
        this.props.getData();
        this.setState({ loader: false });
    }


    render() {
        const status = this.props.item.status;
        const isOffen = status === "offen";
        const isInArbeit = status === "in arbeit";


        return <>
            <Accordion className="accordion">
                <AccordionSummary

                    expandIcon={
                        <ExpandMore onClick={() => this.setState({ expandet: !this.state.expandet })} />
                    }
                >
                    <div
                        className={`w-100 ${isOffen ? "" : " text-secondary"
                            }`}
                        onClick={() => this.setState({ expandet: !this.state.expandet })}
                    >
                        <Typography variant="h6">{this.props.item.title}</Typography>
                    </div>
                    <div className="d-flex align-items-center">
                        <span
                            className={`badge ${isOffen
                                ? "bg-secondary"
                                : isInArbeit
                                    ? "bg-warning"
                                    : "bg-success"
                                }`}
                        >
                            {status.toUpperCase()}
                        </span>
                    </div>
                </AccordionSummary>

                <Card sx={{ padding: "10px" }}>
                    <CardContent className="row">
                        <Typography variant="span" color="" className="col-md-6 ">
                            <small >Beschreibung:</small>
                        </Typography>

                        <div className="col-md-6 text-end">

                            <FormControl size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    label="status"
                                    onChange={(event) =>
                                        this.handleStatus(event.target.value)
                                    }
                                >
                                    <MenuItem value={"offen"}>Offen</MenuItem>
                                    <MenuItem value={"in arbeit"}>In Arbeit</MenuItem>
                                    <MenuItem value={"fertig"}>Fertig</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-12 mt-2">
                            <p>{this.props.item.description}</p>
                        </div>
                        <hr></hr>
                        <div className="col-12">
                            <div className="d-flex flex-column flex-md-row justify-content-between position-relative">
                                <div className="mb-3 d-flex flex-column flex-md-row align-items-start order-md-1 order-2 position-md-static position-absolute top-0 end-0">
                                    <SetAssignee item={this.props.item} data={this.state.data} />
                                </div>
                                <div className="mb-3 d-flex flex-column flex-md-row align-items-start order-md-2 order-1">
                                    <History item={this.props.item} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>

                        <div className=" ">
                            <CreateDialog
                                action="edit"
                                getData={this.props.getData}
                                item={this.props.item}
                            />
                        </div>
                        {status === "fertig" && (
                            <div className="">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => this.setState({ open: true })}
                                >
                                    Löschen <DeleteIcon />
                                </Button>
                            </div>
                        )}


                    </CardActions>
                </Card>
            </Accordion>


            < Dialog Dialog open={this.state.open} onClose={() => this.setState({ open: false })
            }>
                <DialogTitle>Todo wirklich Löschen?</DialogTitle>
                <DialogActions >
                    <Button variant='contained' onClick={() => this.setState({ open: false })} >Abbrechen</Button>
                    <Button variant='contained' color='error' onClick={() => this.delete()} >Löschen</Button>
                </DialogActions>

                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </ Dialog >

        </>;
    }
}

export default Todo;