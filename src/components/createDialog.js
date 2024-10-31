import React from "react";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { Add, Edit } from '@mui/icons-material';
const testData = [
    {
        "title": "Einkaufsliste erstellen",
        "description": "Erstelle eine Liste mit allen benötigten Lebensmitteln für die Woche.",
        "status": "offen"
    },
    {
        "title": "Rechnung bezahlen",
        "description": "Stromrechnung für den Monat Oktober überweisen.",
        "status": "fertig"
    },
    {
        "title": "Arzttermin vereinbaren",
        "description": "Termin für die jährliche Vorsorgeuntersuchung beim Hausarzt vereinbaren.",
        "status": "offen"
    },
    {
        "title": "Bücher zurück in die Bibliothek bringen",
        "description": "Die ausgeliehenen Bücher bis Freitag zurückbringen, um Gebühren zu vermeiden.",
        "status": "offen"
    },
    {
        "title": "Auto waschen",
        "description": "Das Auto gründlich von innen und außen reinigen lassen.",
        "status": "fertig"
    },
    {
        "title": "Geburtstagsgeschenk kaufen",
        "description": "Ein Geschenk für Marias Geburtstag am Samstag besorgen.",
        "status": "offen"
    },
    {
        "title": "Projektbericht fertigstellen",
        "description": "Bericht für das laufende Projekt abschließen und bis Montag einreichen.",
        "status": "offen"
    },
    {
        "title": "Haus aufräumen",
        "description": "Wohnzimmer und Küche für den Besuch am Wochenende sauber machen.",
        "status": "fertig"
    },
    {
        "title": "Fitnessstudio besuchen",
        "description": "Zweimal diese Woche ins Fitnessstudio gehen, um das Trainingsziel zu erreichen.",
        "status": "offen"
    },
    {
        "title": "Wäsche waschen",
        "description": "Schmutzige Kleidung sortieren und die Wäsche waschen.",
        "status": "fertig"
    },
    {
        "title": "Zahnarzttermin nachholen",
        "description": "Den verpassten Zahnarzttermin von letzter Woche nachholen.",
        "status": "offen"
    },
    {
        "title": "Laptop-Update durchführen",
        "description": "Die neuesten Updates auf dem Laptop installieren, um die Sicherheit zu gewährleisten.",
        "status": "fertig"
    },
    {
        "title": "Gartenarbeit erledigen",
        "description": "Unkraut jäten und Blumenbeete pflegen.",
        "status": "offen"
    },
    {
        "title": "Freund anrufen",
        "description": "Thomas anrufen, um über das geplante Treffen zu sprechen.",
        "status": "fertig"
    },
    {
        "title": "Wochenendtrip planen",
        "description": "Unterkunft und Aktivitäten für den Wochenendtrip recherchieren und buchen.",
        "status": "offen"
    },
    {
        "title": "Steuererklärung abgeben",
        "description": "Die Steuerunterlagen vollständig ausfüllen und beim Finanzamt einreichen.",
        "status": "offen"
    },
    {
        "title": "Fotos sortieren",
        "description": "Urlaubsfotos auf dem Computer organisieren und in Alben speichern.",
        "status": "fertig"
    },
    {
        "title": "Neues Rezept ausprobieren",
        "description": "Das neue Pasta-Rezept aus dem Kochbuch ausprobieren.",
        "status": "offen"
    },
    {
        "title": "Schreibtisch aufräumen",
        "description": "Papierstapel sortieren und den Arbeitsplatz ordentlich halten.",
        "status": "fertig"
    },
    {
        "title": "Online-Kurs abschließen",
        "description": "Die letzten Module des Kurses über Webentwicklung durcharbeiten und abschließen.",
        "status": "offen"
    }
]


class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            open: false,
            title: "",
            description: "",
        }
    }



    componentDidMount() {
        //this.generateTestData();
    }

    async generateTestData() {

        for (const item of testData) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                }
                await fetch("http://localhost:5000/todos", requestOptions)
            } catch (error) {
                console.error(error)
            }
        }
    }

    handleOpen() {
        this.setState({ open: true });
        if (!this.props.item) return;

        this.setState({
            title: this.props.item.title,
            description: this.props.item.description
        });
    }

    async create() {

        this.setState({ loader: true })
        const requestOptions = {
            method: 'POST',           // HTTP-Methode (GET, POST, PUT, DELETE, etc.)
            headers: {
                'Content-Type': 'application/json'   // Setzt den Content-Type auf JSON (je nach API-Anforderung)
            },
            body: JSON.stringify({    // Der Body enthält die Daten, die an den Server gesendet werden
                title: this.state.title,
                description: this.state.description
            })
        }
        try {
            await fetch("http://localhost:5000/todos", requestOptions)
            this.props.getData()
            this.setState({ open: false })
        } catch (error) {
            console.error(error)
        }
        finally {
            this.setState({ title: "", description: "", loader: false })
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        if (this.props.action === "create") {
            this.create()
        } else {
            this.update()
        }
    }
    async update() {


        try {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({ title: this.state.title, description: this.state.description }),
                headers: {
                    'Content-Type': 'application/json'   // Setzt den Content-Type auf JSON (je nach API-Anforderung)
                },
            }
            await fetch(`http://localhost:5000/todos/${this.props.item.id}`, requestOptions)
            this.props.getData()
            this.setState({ open: false })
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ loader: false })
        }
    }



    render() {
        const create = this.props.action === "create";

        return < >

            {create ?
                <Tooltip title="Neues Todo erstellen">
                    <IconButton className="ms-auto" color="primary" onClick={() => this.setState({ open: true })} size="small" >
                        <Add />
                    </IconButton>
                </Tooltip> :
                <Tooltip title="Bearbeiten">
                    <IconButton className="ms-auto" color="primary" onClick={() => this.handleOpen()} size="small" >
                        <Edit />
                    </IconButton>
                </Tooltip>
            }



            <Dialog open={this.state.open} onClose={() => this.setState({ open: false })}>
                <DialogTitle>
                    {create ? "Todo Erstellen" : "Todo Bearbeiten"}
                </DialogTitle>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <DialogContent>


                        <TextField
                            value={this.state.title}
                            name="Titel"
                            label="Titel"
                            required
                            placeholder="Title"
                            className="col-12 mt-2"
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />

                        <TextField
                            value={this.state.description}
                            name="Beschreibung"
                            label="Beschreibung"
                            required placeholder="Beschreibung"
                            className="col-12 mt-3"
                            multiline
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" type="submit">Speichern</Button>
                    </DialogActions>
                </form>
                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>
        </>;
    }
}

export default CreateDialog;