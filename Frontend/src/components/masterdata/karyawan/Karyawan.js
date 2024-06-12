import React, { useState, useEffect } from "react";
import "./Karyawan.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function DataKaryawan() {
  const [datakaryawan, setDatakaryawan] = useState([]);
  useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    const response = await axios.get("https://localhost:7142/karyawan/KaryawanGet");
    const data = await response.data;
    setDatakaryawan(data);
    console.log(data);
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.nama_karyawan,
      sortable: true,
    },
    {
      name: "Tanggal Lahir",
      selector: (row) => row.tgl_lahir,
      sortable: true,
    },
    {
      name: "Jenis kelalmin",
      selector: (row) => row.jenis_kelamin,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      sortable: true,
    },
    {
      name: "No Telepon",
      selector: (row) => row.noTlp,
      sortable: true,
    },
    {
      name: "Ubah",
      selector: (row) => (
        <Link to={"/datakaryawan_edit/" + row.id} className="btn btn-primary">
          Edit
        </Link>
      ),

      sortable: true,
    },
    {
      name: "Hapus",
      selector: (row) => (
        <Link to={"/datakaryawan_delete/" + row.id} className="btn btn-danger">
          Delete
        </Link>
      ),

      sortable: true,
    },
  ];
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Data Karyawan</div>
        <div className="conten">
          <h2>Data Karyawan</h2>

          <Link to="/datakaryawan_add" className="btn btn-primary">
            + Data Karyawan
          </Link>

          <DataTable columns={columns} data={datakaryawan.data} pagination />
        </div>
      </div>
    </div>
  );
}

export default DataKaryawan;
