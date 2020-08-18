import React, { Component } from "react";
import axios from "axios";

export default class Form extends Component {
  state = {
    city: "",
    option: "",
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const inf = {
      city: this.state.city,
      option: this.state.option,
    };
    const response = await axios.post("http://localhost:3001/", inf);
    console.log(response.status);
  };

  render() {
    return (
      <div>
        <h3>Ingresa tus datos de busqueda</h3>
        <form onSubmit={this.onSubmit}>
          <label>
            Selecciona una ciudad:
            <select
              name="city"
              value={this.state.city}
              onChange={this.onChange}
            >
              <option value=""></option>
              <option value="bogota">Bogota</option>
              <option value="medellin">Medellin</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Selecciona una opcion:
            <select
              name="option"
              value={this.state.option}
              onChange={this.onChange}
            >
              <option value=""></option>
              <option value="venta">Venta</option>
              <option value="arriendo">Arriendo</option>
            </select>
          </label>
          <br />
          <br />
          <button type="submit">Buscar!</button>
        </form>
      </div>
    );
  }
}
