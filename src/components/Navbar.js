import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    handleNotification = () => {

    }

    render() {
        return (
            <AppBar>
                <ToolBar className='nav-container'>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar
