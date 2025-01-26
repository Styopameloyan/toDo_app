import React from "react";
import CreateDialog from "./components/createDialog";
import Todo from "./components/todo";
import { Backdrop, CircularProgress, IconButton, Menu, Paper, TextField, Typography, MenuItem, Tooltip } from "@mui/material";
import FlipMove from 'react-flip-move';
import { TodoService } from "./services/Todo";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { enqueueSnackbar } from "notistack";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Menü from './components/navMenü';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loader: true,
      reg: true,
      anchorEl: null,
      filter: false,
      sort: false,
      sortAnchorEl: null,
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



  setFilter(filter) {
    this.setState({ filter: false })
    let data = this.state.data

    if (filter === "Alle") return this.setState({ data: this.DATA })

    if (filter === "Erstellt") {
      data = this.DATA.filter(item => item.creator.mail.includes(localStorage.getItem("CurrentUser")))
      this.setState({ data })
      return enqueueSnackbar(`Filter: ${filter}`, { variant: "info" })
    }
    if (filter === "Mir Zugewiesen") {
      console.log(this.DATA);

      data = this.DATA.filter(item => item.assignee && item.assignee.includes(localStorage.getItem("CurrentUser")))
      this.setState({ data })
      return enqueueSnackbar(`Filter: ${filter}`, { variant: "info" })
    }


    data = this.DATA.filter(item => item.status.toLowerCase().includes(filter.toLowerCase()))
    this.setState({ data })
    enqueueSnackbar(`Filter: ${filter}`, { variant: "info" })
  }


  setSort(sort) {
    this.setState({ sort: false });
    if (sort === 'Neuste') {
      this.getData()
    }
    const sortedData = [...this.DATA].sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return dateA - dateB;
    });
    this.setState({ data: sortedData });
    enqueueSnackbar(`Sort: ${sort === 'Neuste' ? 'Neueste zuerst' : 'Älteste zuerst'}`, { variant: 'info' });
  }


  render() {
    const Filter = ["Alle", "Offen", "Fertig", "In Arbeit", "Erstellt", "Mir Zugewiesen"]
    const SortOptions = ["Neuste", "Älteste"]
    return (<>
      <Menü changeTheme={() => this.props.changeTheme()} />

      <Paper className="d-flex align-items-center gap-4 mt-4 p-2 px-4 todoHeader">
        <TextField placeholder="Suchen..." size="small" onChange={(e) => this.handleSearch(e.target.value)} />


        <CreateDialog action="create" getData={this.getData.bind(this)} />

        <Tooltip title="Sortieren"  >
          <IconButton>
            <ImportExportIcon onClick={(e) => this.setState({ sort: true, sortAnchorEl: e.currentTarget })} />
          </IconButton>
        </Tooltip>
        <Menu
          open={this.state.sort}
          anchorEl={this.state.sortAnchorEl}
          onClose={() => this.setState({ sort: false, sortAnchorEl: null })}
        >
          {SortOptions.map((item, index) => (
            <MenuItem key={index} onClick={() => this.setSort(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>


        <Tooltip title="Filtern"  >
          <IconButton>
            <FilterAltIcon onClick={(e) => this.setState({ filter: true, anchorEl: e.currentTarget })} />
          </IconButton>
        </Tooltip>
        <Menu
          open={this.state.filter}
          anchorEl={this.state.anchorEl}
          onClose={() => this.setState({ filter: false })}>
          {
            Filter.map((item, index) => {
              return <MenuItem key={index} onClick={() => this.setFilter(item)}>{item}</MenuItem>
            })
          }
        </Menu>
        <Typography variant="subtitle2" className="text-secondary">{this.state.data.length}/{this.DATA.length}</Typography>
      </Paper>

      <div className="mt-3 todo-container" >
        <FlipMove>
          {this.state.data.map((item) => {
            return <Todo getData={this.getData.bind(this)} item={item} key={item.rowid} />
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