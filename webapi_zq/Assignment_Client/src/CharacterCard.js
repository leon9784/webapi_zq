//snippet rce
import React, { Component } from 'react';
import { UncontrolledButtonDropdown } from 'reactstrap';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from 'reactstrap';

export class CharacterCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      character_id,
      title,
      name,
      gender,
      culture,
      born,
      aliases,
      character_image
    } = this.props.character;
    return (
      <div>
        <Table hover striped bordered>
          <thead>
            <tr>
              <th>
                <center>ID</center>
              </th>
              <th>
                <center>Avatar</center>
              </th>
              <th>
                <center>Name</center>
              </th>
              <th>
                <center>Born</center>
              </th>
              <th>
                <center>Gender</center>
              </th>
              <th>
                <center>Culture</center>
              </th>
              <th>
                <center>Aliases</center>
              </th>
              <th>
                <center>Action</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '20px' }}>{character_id}</td>
              <td style={{ width: '200px' }}>
                <img width="200px" height="200px" src={character_image} />
              </td>
              <td style={{ width: '200px' }}>{name}</td>
              <td style={{ width: '200px' }}>{born}</td>
              <td style={{ width: '200px' }}>{gender}</td>
              <td style={{ width: '200px' }}>{culture}</td>
              <td style={{ width: '200px' }}>{aliases}}</td>
              <td>
                {' '}
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret color="danger">
                    Select
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Choose any</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem disabled class="addbutton">
                      ADD
                    </DropdownItem>

                    <DropdownItem
                      class="deletebutton"
                      onClick={() => this.props.removeCharacter(character_id)}
                    >
                      DELETE
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CharacterCard;
