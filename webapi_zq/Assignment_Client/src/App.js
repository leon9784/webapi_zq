// heroku : serene-fortress-82984
import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      alertGreen: false,
      name: '',
      character_id: '',
      characters: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ alertGreen: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://intense-cove-82056.herokuapp.com/getallcharacters')
      .then(result => {
        this.setState({ characters: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://intense-cove-82056.herokuapp.com/addCharacter?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ alertGreen: true });
          setTimeout(() => {
            this.setState({ alertGreen: false });
          }, 1000);
        }
        this.getAllCharacters();
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCharacter(character_id) {
    this.setState({
      characters: this.state.characters.filter(character => {
        if (character.character_id !== character_id) return character;
      })
    });
    const query = `https://intense-cove-82056.herokuapp.com/deletecharacter?character_id=${character_id}`;

    axios
      .get(query)
      .then(result => {
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let characterCards = this.state.characters.map(character => {
      return (
        <Col sm="12" key={character.name}>
          <CharacterCard
            removeCharacter={this.removeCharacter.bind(this)}
            character={character}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Jumbotron id="jumboheader">
            <h1 className="display-4">Games Of Thrones</h1>
            <p />
            <h1 className="display-6">Character Search</h1>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.alertGreen}
                toggle={this.onDismiss}
              >
                Character found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Enter character name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter character name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{characterCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
