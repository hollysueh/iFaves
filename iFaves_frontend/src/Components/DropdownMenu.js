import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../App.css';

//Dropdown menu - user can choose between 'search' component page and 'favourites' component page
const DropdownMenu = () => (
    <div className="App">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"/>
        <Dropdown className="dropdownMenu" id="navDropdown" > 
            <DropdownButton title="View Page">
                <Dropdown.Item className="dropdownLink"><Link to="/MyFavesList">My Favourites</Link></Dropdown.Item><br></br>
                <Dropdown.Item className="dropdownLink"><Link to="/SearchAPI">Search</Link></Dropdown.Item>
            </DropdownButton>
        </Dropdown>
    </div>
)

export default DropdownMenu;
