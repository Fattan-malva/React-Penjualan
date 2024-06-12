import "./Karyawan.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function KaryawanEdit() {
  const { id } = useParams();

  // Define state
  const [formValue, setFormValue] = useState({
    id:"",
    nama_karyawan: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    noTlp   : "",
  });

  // useEffect hook
  useEffect(() => {
    // Call fetchData method
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      // Fetching data
      const response = await axios.get(
        `https://localhost:7278/api/Trainer/TrainerByNim?id=${id}`
      );

      // Get response data
      const data = await response.data;

      // Assign response data to state "formValue"
      setFormValue(data[0]);
    } catch (error) {
      console.log(error);
      alert("Data tidak ditemukan atau sudah dihapus!");
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make axios update request
      await axios.put(
        `https://localhost:7278/api/Trainer/Update?id=${id}`,
        formValue // Pass formValue as data to update
      );

      // Redirect back to the master data after successful update
      window.location.href = "/datatrainer";

      alert("Data berhasil diupdate");
    } catch (error) {
      console.error(error);
      alert("Error updating data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Edit Data Karyawan: {formValue.nama_karyawan}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder="Enter ID"
              value={formValue.id}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_karyawan"
              placeholder="Enter Nama"
              value={formValue.nama_karyawan}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="tgl_lahir"
              placeholder="Enter Tanggal"
              value={formValue.tgl_lahir}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="jenis_kelamin"
              placeholder="Enter Jenis Kelamin"
              value={formValue.jenis_kelamin}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="alamat"
              placeholder="Enter alamat"
              value={formValue.alamat}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="noTlp"
              placeholder="Enter noTlp"
              value={formValue.noTlp}
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KaryawanEdit;
