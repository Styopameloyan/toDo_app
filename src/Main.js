import React from 'react';
import App from './App';
import Reg from './components/reg';
import './css/reg.css'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reg: true,

        }
    }

    render() {
        return <>
            {this.state.reg ? <Reg /> : <App />}

        </>;
    }
}


export default Main;

