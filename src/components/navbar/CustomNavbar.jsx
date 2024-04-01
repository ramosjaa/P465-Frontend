import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import InfoButton from '../info_button/InfoButton';

const NavButtons = () => {
    const navigate = useNavigate(AuthContext);
    const { logout } = useContext(AuthContext);

    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const type = user?.type;

    const handleLogout = () => {
        logout();
        navigate("/home");
    }

    if (isAuthenticated) {
        if (type == 1) { //we only have an info button for regular users right now, will add functionality for venues eventually
            return (
                <InfoButton />
            )
        } else {
            return (<Button onClick={handleLogout} className="btn-styles me-2" variant="primary" size="sm" >Logout</Button>);
        }
    } else {
        return (
            <div>
                <Button className="btn-styles me-2" variant="primary" size="sm" href="/login">Login</Button>
                <Button className="btn-styles me-2" variant="primary" size="sm" href="/signup">User Signup</Button>
                <Button className="btn-styles me-2" variant="primary" size="sm" href="/vsignup">Venue Signup</Button>
            </div>
        );
    }


}

const CustomNavbar = () => {
    return (
        <Navbar bg="none" variant="dark" expand="lg" className="justify-content-between">
            <Container fluid>
                <Navbar.Brand href="/home" className="text-white fs-3 fw-bold ml-5">Rhythm Reserve</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto fw-normal custom-nav-links">
                        <Nav.Link href="#events" className="me-2">Events</Nav.Link>
                        <Nav.Link href="#live" className="me-2">Live</Nav.Link>
                        <Nav.Link href="#venues" className="me-2">Venues</Nav.Link>
                        <NavButtons />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;