import React, { useState, useEffect } from "react";
import "./Transaksi.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function DataTransaksi() {
  //define state
  const [datatransaksi, setDatatransaksi] = useState([]);
  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://localhost:7142/transaksi/TransaksiGet"
    );
    //get response data
    const data = await response.data;
    //assign response data to state "datatransaksi"
    setDatatransaksi(data);
    console.log(data);
  };
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "ID Produk",
      selector: row => row.idproduk,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: row => row.tanggal,
      sortable: true,
    },
    {
      name: "Harga Total",
      selector: row => row.hargatotal,
      sortable: true,
    },
    {
      name: "ID Karyawan",
      selector: row => row.id_karyawan,
      sortable: true,
    },
    // {
    //   name: "Ubah",
    //   selector: (row) => (
    //     <Link to={"/datatransaksi_edit/"+ row.id}
    //     className="btn btn-primary">
    //       Edit
    //     </Link>
    //   ),

    //   sortable: true,
    // },
    // {
    //   name: "Hapus",
    //   selector: (row) => (
    //     <Link
    //       to={"/datatransaksi_delete/" + row.id}
    //       className="btn btn-danger"
    //     >
    //       Delete
    //     </Link>
    //   ),

    //   sortable: true,
    // },
  ];
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Transaksi</div>
        <div className="conten">
          <h2>Data Mahasiswa</h2>

          <Link
            to="/datatransaksi_add"
            className="btn btn-primary"
          >
            + Data Transaksi
          </Link>

          <DataTable columns={columns} data={datatransaksi.data} pagination />
        </div>
      </div>
    </div>
  );
}
export default DataTransaksi;
