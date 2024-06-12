import "./Transaksi.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TransaksiEdit() {
  const { id } = useParams();

  // Define state
  const [formValue, setFormValue] = useState({
    id: "",
    nama: "",
    email: "",
    password: "",
    nohp: "",
    status: "",
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
        `https://localhost:7181/Transaksi-By-Id?id=${id}`
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
        `https://localhost:7181/transaksi/TransaksiEdit?id=${id}`,
        formValue // Pass formValue as data to update
      );

      // Redirect back to the master data after successful update
      window.location.href = "/datatransaksi";

      alert("Data berhasil diupdate");
    } catch (error) {
      console.error(error);
      alert("Error updating data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Edit Data Transaksi: {formValue.nama}</div>
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
              name="nama"
              placeholder="Enter Nama"
              value={formValue.nama}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formValue.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="password"
              placeholder="Enter Password"
              value={formValue.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nohp"
              placeholder="Enter Nomor HP"
              value={formValue.nohp}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="number"
              name="status"
              placeholder="Enter Status"
              value={formValue.status}
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

export default TransaksiEdit;
