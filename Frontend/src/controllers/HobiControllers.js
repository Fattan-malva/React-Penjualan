import React, { Component } from "react";
import DataTable from "react-data-table-component";
const columns = [
  {
    name: "Nama",
    selector: (row) => row.nama,
    sortable: true,
  },
  {
    name: "Hobi",
    selector: (row) => row.hobi,
    sortable: true,
  },
];
const data = [
  {
    id: 1,
    nama: "FattanMalva",
    hobi: "apa aja asal ga botak",
  },
  {
    id: 2,
    nama: "Eko Abdul Ghoffar",
    hobi: "Catur",
  },
];
class DataHobi extends Component {
  render() {
    return <DataTable columns={columns} data={data} pagination />;
  }
}
export default DataHobi;
