import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

import Game from './game/game';
import Home from './pages/home';
import Users from './pages/users';
import AboutPage from './pages/AboutPage';
import PlayingCardsPage from './pages/PlayingCardsPage';

import TodoContainer from './components/TodoContainer';

const App = () => (
  
  <MemoryRouter>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/home"><Navbar.Brand href="#home">Hades!</Navbar.Brand></LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/about"><Nav.Link >About</Nav.Link></LinkContainer>
          <LinkContainer to="/cards"><Nav.Link >Cards</Nav.Link></LinkContainer>
          <LinkContainer to="/users"><Nav.Link >Users</Nav.Link></LinkContainer>
          <LinkContainer to="/game"><Nav.Link >Tic-Tac-Toe</Nav.Link></LinkContainer>
          <LinkContainer to="/todo"><Nav.Link >To Do</Nav.Link></LinkContainer>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>

    <Container className="p-1">

      <h1 className="pt-1 header">Welcome To Hades (abandon all hope).</h1>

      <Switch>
        <Route path="/todo"><TodoContainer /></Route>
        <Route path="/game"><Game /></Route>
        <Route path="/about"><AboutPage /></Route>
        <Route path="/users"><Users /></Route>
        <Route path="/cards"><PlayingCardsPage /></Route>
        <Route path="/"><Home /></Route>
      </Switch>

    </Container>
  </MemoryRouter>
);

export default App;
