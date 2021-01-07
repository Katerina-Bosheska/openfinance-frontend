import React from 'react';
import logo from './logo.png';
import './navbar.css';
import {Link} from 'react-router-dom';
import {DropdownButton, DropdownItem, Dropdown} from "react-bootstrap";

class Navbar extends React.Component {

    render(){

        const icon = (
            <div style={{display: "inline-block"}}>
                <span className="fa fa-exchange pr-2"></span>
                 Трансакции
            </div>
        );

        return (
          <div id="navbar-container">
              <Link to="/" href="#" id="navbar-brand">
                  <img id="logo" src={logo}></img>
                  <p>Open Finance</p>
              </Link>
              <ul id="navbar-items">
                  <li><Link to="/about" id="about" className="navbar-item">За нас</Link></li>
                  <li><Link to="/links" className="navbar-item"><span className="fa fa-list-ul"></span> Линкови</Link></li>
                  <li><Link to="/budget" className="navbar-item"><span className="fa fa-briefcase"></span> Буџетски корисници</Link></li>
                  <li>
                      <Link className="navbar-item">
                          <DropdownButton id="dropdown-transactions" title={icon}>
                              <Link to="/recipients"><Dropdown.Item className="dropdown-item" as="button"><span className="fa fa-arrow-right"></span> Примател</Dropdown.Item></Link>
                              <Link to="/payers"><Dropdown.Item className="dropdown-item" as="button"><span className="fa fa-arrow-left"></span> Давател</Dropdown.Item></Link>
                          </DropdownButton>
                      </Link>
                  </li>
                  <li><Link to="/" className="navbar-item"><span className="fa fa-home"></span> Почетна</Link></li>
              </ul>
          </div>
        );
    }

}

export default Navbar;