import React from "react";
import CreateDialog from "./components/createDialog";
import Todo from "./components/todo";
import { Backdrop, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import FlipMove from 'react-flip-move';
import { TodoService } from "./services/Todo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loader: true,
      reg: true
    }
    this.DATA = [];
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {
    this.setState({ loader: true })
    const [error, data] = await TodoService.getTodos();
    if (error) {
      console.error("Fehler beim Abrufen der Todos:", error.message);
    } else {
      this.DATA = data
      this.setState({ data, loader: false });
    }
  }

  handleSearch(value) {
    let data = this.state.data
    if (value.length >= 2) {
      data = this.DATA.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
      this.setState({ data })
    } else {
      this.setState({ data: this.DATA })
    }
  }

  render() {
    return (<>
      <Paper className="d-flex align-items-center gap-4 mt-4 p-2 px-4 todoHeader">
        <Typography color="primary" variant="h5">TODOS</Typography>
        <CreateDialog action="create" getData={this.getData.bind(this)} />
        <TextField placeholder="Suchen..." size="small" onChange={(e) => this.handleSearch(e.target.value)} />
        <Typography variant="subtitle2" className="text-secondary">{this.state.data.length}/{this.DATA.length}</Typography>
      </Paper>

      <div className="mt-3 todo-container">
        <FlipMove>
          {this.state.data.map((item) => {
            return <Todo getData={this.getData.bind(this)} item={item} key={item.id} />
          })}
        </FlipMove>
      </div>

      <Backdrop open={this.state.loader}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </>);
  }
}

export default App;