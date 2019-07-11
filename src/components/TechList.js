import React, { Component } from 'react';

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  // Chamado quando componente aparece na tela.
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }

  }

  // Chamado sempre que houver alterações no estado ou props do componente 
  componentDidUpdate(_, prevProps) {
    if (prevProps.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  // Chamado quando componente deixa de existir.
  componentWillUnmount() { }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })
  }

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(tec => tec !== tech) })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech =>
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          )
          }
        </ul>
        <input
          type='text'
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList;