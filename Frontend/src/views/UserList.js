import React, { Component } from "react";
import DataUser from "../controllers/UserControllers";
import DataHobi from "../controllers/HobiControllers";
class UserList extends Component {
  render() {
    return (
      <div className="card">
        <div className="container">
          <div className="Titel">UserList</div>
          <div className="conten">
            <h2>Data Pengguna</h2>
            <DataUser />
            <hr />
            <br/>
            <DataHobi/>
          </div>
        </div>
      </div>
    );
  }
}
export default UserList;
