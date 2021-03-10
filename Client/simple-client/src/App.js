import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, NavItem } from 'react-bootstrap';

import Browse from './Components/Browse/Browse';
import Dashboard from './Components/Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router >
            <Container>
                <Nav>
                    <Navbar>
                        <NavItem>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/" className="nav-link">Home</Link>
                        </NavItem>
                    </Navbar>
                </Nav>

                <hr />

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

            </Container>
        </Router>
    )
}

export default App;