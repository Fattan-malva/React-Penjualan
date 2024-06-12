import React, { useState, useEffect } from "react";
import "./Produk.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function DataProduk() {
  //define state
  const [dataproduk, setDataproduk] = useState([]);
  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://localhost:7142/produk/ProdukGet"
    );
    //get response data
    const data = await response.data;
    //assign response data to state "dataproduk"
    setDataproduk(data);
    console.log(data);
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nama Produk",
      selector: (row) => row.namaproduk,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Harga Satuan",
      selector: (row) => row.hargasatuan,
      sortable: true,
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link to={"/dataproduk_edit/" + row.id} className="btn btn-primary">
          Edit
        </Link>
      ),

      sortable: true,
    },
    {
      name: "Hapus",
      selector: (row) => (
        <Link
          to={"/dataproduk_delete/" + row.id}
          className="btn btn-danger"
        >
          Delete
        </Link>
      ),

      sortable: true,
    },
  ];
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Produk</div>
        <div className="conten">
          <h2>Data Produk</h2>

          <Link
            to="/dataproduk_add"
            className="btn btn-primary"
          >
            + Data Produk
          </Link>

          <DataTable columns={columns} data={dataproduk.data} pagination />
        </div>
      </div>
    </div>
  );
}
export default DataProduk;
