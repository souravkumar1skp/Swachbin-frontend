import React from "react";
import '../App.css';
import { Avatar, Button, Tooltip, Typography, Grow } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import { NavLink } from 'react-router-dom';
import {blueGrey} from '@mui/material/colors'
import { useValue } from "../context/ContextProvider";
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
    const {
        state: {
          login: {x},
        },
      } = useValue()

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/"><Typography variant="h5" color={blueGrey[700]} fontWeight='900'>SwachBin</Typography></a>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <Grow in='true'>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <Tooltip TransitionComponent={Zoom} title="Home Page" enterDelay={500} enterNextDelay={200}>
                            <li className="nav-item active hover">
                                <NavLink className="nav-link" to="/"><Typography variant="inherit" fontWeight='500'>&nbsp;Home <span className="sr-only">(current)</span></Typography></NavLink>
                            </li>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} title="Know more about us" enterDelay={500} enterNextDelay={200}>
                            <li className="nav-item hover">
                                <NavLink className="nav-link" to="/about"><Typography variant="inherit" fontWeight='500'>About us</Typography></NavLink>
                            </li>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} title="Contact-Us" enterDelay={500} enterNextDelay={200}>
                            <li className="nav-item hover">
                                <NavLink className="nav-link" to="/contact"><Typography variant="inherit" fontWeight='500'>Contact</Typography></NavLink>
                            </li>
                        </Tooltip>
                    </ul></Grow>
                    <form className="form-inline my-2 my-lg-0 hover">
                        {(x)? <Avatar/> : <Button variant="contained" startIcon={<LoginIcon/>}>Login</Button>}
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
