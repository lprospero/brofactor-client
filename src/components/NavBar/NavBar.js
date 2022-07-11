import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";


const NavBar = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const handleSignout = (e) => {
        removeCookie("user");
        document.location = "";
    }

    if (cookies.user) {
        return (
            <div className="bro-nav">
                <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand as={Link} to="/">Brofactor</Navbar.Brand>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown active={false} drop="end" title="Players" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/players">List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/players/new">New</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown active={false} drop="end" title="Awards" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/awards">List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/awards/new">New</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleSignout} as={Link} to="/">Signout</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    } else {
        return (
            <div className="bro-nav">
                <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand as={Link} to="/">Brofactor</Navbar.Brand>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
    
}

export default NavBar;