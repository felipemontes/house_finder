import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import swal from "sweetalert";

import "./styles/Form.css";
export default class Form extends Component {
  state = {
    city: "",
    option: "",
    property: "",
    quantity: 1,
    downId: "",
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
      property: this.state.property,
      quantity: this.state.quantity,
    };
    if (Object.values(inf).length !== 4) {
      this.errorManager();
    }
    try {
      this.hideSearch();
      this.showLoading();
      const response = await axios.post("http://localhost:3001/", inf);
      if (response.status === 200) {
        this.setState({
          downId: response.data,
        });
        this.hideLoading();
        this.showDownload();
      }
      console.log(response.status);
    } catch (e) {
      this.errorManager();
    }
  };

  showDownload = () => {
    const content = document.getElementById("down");
    content.style.display = "inline-block";
  };

  showLoading = () => {
    const content = document.getElementById("loader");
    content.style.display = "inline-block";
  };

  hideLoading = () => {
    const content = document.getElementById("loader");
    content.style.display = "none";
  };

  hideSearch = () => {
    const content = document.getElementById("search");
    content.style.display = "none";
  };

  download = async () => {
    const getId = this.state.downId;
    const output = new Date().toLocaleString() + ".csv";
    const response = await axios({
      method: "GET",
      url: `http://localhost:3001/download/${getId}`,
    });
    window.location.reload(false);
    window.open(fileDownload(response.data, output));
  };

  errorManager = async () => {
    await swal("Error", "Revise los datos e intente de nuevo", "error");
    window.location.reload(false);
  };

  render() {
    return (
      <div className="container">
        <div className="form-container sign-up-container">
          <h1>Crear lista</h1>

          <h3>Ingresa tus datos de busqueda</h3>
          <form onSubmit={this.onSubmit}>
            <label>
              Selecciona una ciudad:
              <br />
              <br />
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
              Selecciona tipo de inmueble:
              <br />
              <br />
              <select
                name="property"
                value={this.state.property}
                onChange={this.onChange}
              >
                <option value=""></option>
                <option value="apto">Apartamento</option>
                <option value="casa">Casa</option>
              </select>
            </label>
            <br />
            <br />
            <label>
              Selecciona una opcion:
              <br />
              <br />
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
            <label>
              Ingresa cantidad de paginas:
              <br />
              <br />
              <label>
                <input
                  type="radio"
                  name="quantity"
                  value="1"
                  checked={this.state.quantity === "1"}
                  onChange={this.onChange}
                />
                1
              </label>
              <label>
                <input
                  type="radio"
                  name="quantity"
                  value="2"
                  checked={this.state.quantity === "2"}
                  onChange={this.onChange}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  name="quantity"
                  value="3"
                  checked={this.state.quantity === "3"}
                  onChange={this.onChange}
                />
                3
              </label>
              <label>
                <input
                  type="radio"
                  name="quantity"
                  value="4"
                  checked={this.state.quantity === "4"}
                  onChange={this.onChange}
                />
                4
              </label>
              <label>
                <input
                  type="radio"
                  name="quantity"
                  value="5"
                  checked={this.state.quantity === "5"}
                  onChange={this.onChange}
                />
                5
              </label>
            </label>
            <br />
            <br />
            <div className="align-center">
              <div id="loader" className="loader"></div>
            </div>
            <button id="search" type="submit" className="button1">
              Buscar!
            </button>
          </form>
          <button id="down" className="button2" onClick={this.download}>
            Download
          </button>
        </div>
        <div className="form-container sign-in-container del">
          <h1>House Finder</h1>
          <p>
            House Finder es un web scraper que genera un CSV a partir de las
            propiedades listadas en fincaraiz.com.co. Descarge su archivo csv
            con su busqueda deseada y navegue entre los resultados de forma
            sencilla.
          </p>
          <p>
            El CSV contiene nombre, precio, metros cuadrados entre otros
            detalles.
          </p>
          <h2>Instrucciones</h2>
          <li>1)Ingrese los datos de busqueda</li>
          <li>2)Espere a que el scraper complete la busqueda</li>
          <li>
            3)Cuando se complete la busqueda aparecera el boton de descarga
          </li>
          <li>4)Descargue el archivo CSV con la informacion</li>
          <p>Follow Me:</p>
        </div>
      </div>
    );
  }
}
