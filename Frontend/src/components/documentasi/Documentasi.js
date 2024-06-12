import React, { Component } from "react";
import "./Documentasi.css";
import Foto from "../documentasi/dokumen.jpg"
class Documentasi extends Component {
  render() {
    return (
      <div className="card">
        <div className="container">
          <div className="Titel">Documentation</div>
          <div className="foto">
            <img src={Foto} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Documentasi;
