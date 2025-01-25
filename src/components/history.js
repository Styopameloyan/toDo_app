import React from 'react';
import { TodoService } from '../services/Todo';
import { Avatar, Tooltip } from "@mui/material";

import "../css/history.css"; // Die externe CSS-Datei importieren

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            avatarUpdater: "",
            date: "",
            updateDate: ""

        };
    }

    async componentDidMount() {

        const avatar = await TodoService.makeAvatar(this.props.item.creator.displayName);
        this.setState({ avatar });
        this.setDate(this.props.item.createDate)
        if (this.props.item.createDate !== this.props.item.updateDate) {
            const avatarUpdater = await TodoService.makeAvatar(this.props.item.updater.displayName);
            this.setState({ avatarUpdater });
            this.setUpdateDate(this.props.item.updateDate, "UpdateDate")
        }
    }
    setDate(rowDate) {
        const formattedDate = new Date(rowDate).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',

        })
        this.setState({ date: formattedDate })
    }
    setUpdateDate(rowDate) {
        const formattedDate = new Date(rowDate).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',

        })
        this.setState({ updateDate: formattedDate })
    }

    render() {

        return (
            <>

                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <small className="">Erstellt: {this.state.date}</small>
                    <Tooltip placement="bottom" title={this.props.item.creator.displayName}>
                        <Avatar>{this.state.avatar}</Avatar>
                    </Tooltip>

                    {this.props.item.createDate !== this.props.item.updateDate && (
                        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                            <small className="">Geupdatet: {this.state.updateDate}</small>
                            <Tooltip placement="bottom" title={this.props.item.updater.displayName}>
                                <Avatar color="text.secondary">{this.state.avatarUpdater}</Avatar>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default History;
