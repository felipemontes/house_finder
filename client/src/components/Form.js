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
    tb: "",
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
    };
    if (Object.values(inf).length !== 3) {
      this.errorManager();
    }
    try {
      this.hideSearch();
      this.showLoading();
      const response = await axios.post("http://localhost:3001", inf);
      if (response.status === 200) {
        this.setState({
          tb: response.data,
        });
        this.hideLoading();
        this.showDownload();
      }
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
    const downloadTb = this.state.tb;
    const output = new Date().toLocaleString() + ".csv";
    const response = await axios.get(
      `http://localhost:3001/download/${downloadTb}`
    );
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
        <div className="form-container left-container">
          <h1>Crear lista</h1>

          <h3>Ingresa tus datos de búsqueda</h3>
          <br />
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
                <option value="bog">Bogota</option>
                <option value="med">Medellin</option>
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
                <option value="apt">Apartamento</option>
                <option value="cas">Casa</option>
              </select>
            </label>
            <br />
            <br />
            <label>
              Selecciona una opción:
              <br />
              <br />
              <select
                name="option"
                value={this.state.option}
                onChange={this.onChange}
              >
                <option value=""></option>
                <option value="ven">Venta</option>
                <option value="arr">Arriendo</option>
              </select>
            </label>
            <br />
            <br />
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
        <div className="form-container right-container del">
          <h1>House Finder</h1>
          <p>
            House Finder es un web scraper que genera un CSV a partir de las
            propiedades listadas en fincaraiz.com.co. Descargue su archivo CSV
            con su búsqueda deseada y navegue entre los resultados de forma
            sencilla.
          </p>
          <p>
            El CSV contiene nombre, precio, metros cuadrados entre otros
            detalles.
          </p>
          <h2>Instrucciones</h2>
          <li>1)Ingrese los datos de búsqueda</li>
          <li>
            2)Cuando se complete la búsqueda aparecerá el botón de descarga
          </li>
          <li>3)Descargue el archivo CSV con la información</li>
          <p>Follow Me:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/felipemontes/house_finder"
          >
            Code
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/felipemontes"
          >
            Github
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/felipe-londono/"
          >
            LinkedIn
          </a>
        </div>
      </div>
    );
  }
}
