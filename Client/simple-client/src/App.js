import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

import Browse from './Components/Browse/Browse';
import Dashboard from './Components/Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Container>
                <Col>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav>

                                <Link to="/" className="nav-link text-dark">Home</Link>
                                <Link to="/dashboard" className="nav-link text-dark">Dashboard</Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Row>
                        <Col>
                            <Switch>

                                <Route exact path="/">
                                    <Browse />
                                </Route>
                                <Route path="/dashboard">
                                    <Dashboard />
                                </Route>

                            </Switch>
                        </Col>
                    </Row>
                </Col>

            </Container>
        </Router>
    )
}

export default App;