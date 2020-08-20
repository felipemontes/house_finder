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
    quantity: "",
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
      const response = await axios.post("http://localhost:3001/", inf);
      if (response.status === 200) {
        this.setState({
          downId: response.data,
        });
        this.showDownload();
      }
      console.log(response.status);
    } catch (e) {
      this.errorManager();
    }
  };

  showDownload = () => {
    var content = document.getElementById("down");
    content.style.display = "";
  };

  download = async () => {
    const getId = this.state.downId;
    const output = new Date().toLocaleString() + ".csv";
    const response = await axios({
      method: "GET",
      url: `http://localhost:3001/download/${getId}`,
    });
    window.open(fileDownload(response.data, output));
  };

  errorManager = () => {
    swal("Error", "Revise los datos e intente de nuevo", "error");
  };

  render() {
    return (
      <div className="container">
        <div className="form-container sign-up-container">
          <h1>Encuentre su inmueble deseado</h1>

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
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.onChange}
              />
            </label>
            <br />
            <br />
            <button type="submit">Buscar!</button>
          </form>
          <br />
          <button id="down" style={{ display: "none" }} onClick={this.download}>
            Download
          </button>
        </div>
        <div className="form-container sign-in-container del">
          <h2>House scraper</h2>
          <p>
            House scraper es un web scraper que obtiene su informacion de
            fincaraiz.com.co, descarge un archivo csv con su busqueda deseada y
            navegue entre los resultados de forma sencilla
          </p>
          <p>
            La intencion de house scraper es facilitar la busqueda de
            propiedades
          </p>
          <h2>Instrucciones</h2>

          <li>1)Ingrese los datos de busqueda</li>
          <li>2)Espere a que el scraper complete la busqueda</li>
          <li>
            3)Cuando se complete la busqueda aparecera el boton de descarga
          </li>
          <li>4)Descargue el archivo csv con la informacion</li>
        </div>
      </div>
    );
  }
}
