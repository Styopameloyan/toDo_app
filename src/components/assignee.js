import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TodoService } from "../services/Todo";
import { enqueueSnackbar } from "notistack";

class SetAssignee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || [],
            assigneed: "",
            selectedAssignee: this.props.item.assigneed
                ? this.props.item.assigneed.displayName
                : "nicht zugewiesen",

        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.item.assigneed !== prevProps.item.assigneed) {
            this.setState({
                selectedAssignee: this.props.item.assigneed
                    ? this.props.item.assigneed.displayName
                    : "nicht zugewiesen", // Aktualisiere den State
            });
        }
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data });
        }
    }

    setUser(user) {
        this.setState({ selectedAssignee: user, assigneed: user.mail });
    };

    async handleAssigne(user, todo) {
        const [error] = await TodoService.setAssignee(user, todo)
        if (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: "error" });

            return;
        }
        enqueueSnackbar("Status Zuweisung geupdated", { variant: "success" });
    }


    render() {
        return (
            <FormControl >
                <InputLabel>Zuweisung</InputLabel>
                <Select
                    label="Zuweisung"
                    value={this.state.selectedAssignee}
                    onChange={(event) => this.setUser(event.target.value)}
                >
                    <MenuItem value="nicht zugewiesen">Nicht zugewiesen</MenuItem>

                    {this.state.data.map((item, index) => (
                        <MenuItem onClick={() => this.handleAssigne(item, this.props.item)} key={index} value={item.displayName}>
                            {item.displayName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default SetAssignee;
