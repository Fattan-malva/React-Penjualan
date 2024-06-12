import React, { Component } from "react";
import "./Profile.css";
class Profile extends Component {
  render() {
    return (
      <div className="card">
        <div className="container">
          <div className="Titel">Profile</div>
          <div className="conten">
            <p>
              <b>Belajar React</b>
              <br></br>Membuat Website Sederhana dengan React JS
            </p>
            <h1>Biodata</h1>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>: M. Fattan Malva A.</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>: Kediri</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: fattanmalva@gmail.com</td>
              </tr>
              <tr>
                <td>Institut Pendidikan Terakhir</td>
                <td>: SMKN 1 NGASEM</td>
              </tr>
              <tr>
                <td>Cita-cita</td>
                <td>: Menguasai Dunia</td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
