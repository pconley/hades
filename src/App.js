import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

import Game from './game/game';

import TodoContainer from './components/TodoContainer';

const dummyPage = title => <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>{title}</h1>

const Home = () => dummyPage("Home Page");
const About = () => dummyPage("About Page");
const Users = () => dummyPage("Users Page");;

const App = () => (
  <MemoryRouter>
    <Container className="p-3">
      <ButtonToolbar className="custom-btn-toolbar">
        <LinkContainer to="/"><Button>Home</Button></LinkContainer>
        <LinkContainer to="/about"><Button>About</Button></LinkContainer>
        <LinkContainer to="/users"><Button>Users</Button></LinkContainer>
        <LinkContainer to="/game"><Button>Tic Tac Toe</Button></LinkContainer>
        <LinkContainer to="/todo"><Button>TODO Page</Button></LinkContainer>
      </ButtonToolbar>

      <h1 className="header">Welcome To Hades (abandon all hope).</h1>

      <Switch>
        <Route path="/todo"><TodoContainer /></Route>
        <Route path="/game"><Game /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/users"><Users /></Route>
        <Route path="/"><Home /></Route>
      </Switch>

    </Container>
  </MemoryRouter>
);

export default App;
