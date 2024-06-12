import React, { Component } from "react";
import DataTable from "react-data-table-component";
const columns = [
  {
    name: "Owner",
    selector: (row) => row.owner,
    sortable: true,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
  },
];
const data = [
  {
    id: 1,
    owner: "FattanMalva",
    alamat: "Kediri",
  },
  {
    id: 2,
    owner: "Askoding",
    alamat: "Yogyakarta",
  },
];
class DataUser extends Component {
  render() {
    return <DataTable columns={columns} data={data}/>;
  }
}
export default DataUser;
