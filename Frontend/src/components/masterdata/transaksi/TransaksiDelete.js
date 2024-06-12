import "./Transaksi.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TransaksiDelete() {
  const { id } = useParams();

  // Define state
  const [formValue, setFormValue] = useState({
    id: "",
    idproduk: "",
    quantity: "",
    tanggal: "",
    hargatotal: "",
    id_karyawan: "",
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
        `https://localhost:7142/transaksi/TransaksiGetById?id=${id}`
      );

      // Get response data
      const data = await response.data;
      const dataid = data[0].id;
      const dataidproduk = data[0].idproduk;
      const dataquantity = data[0].quantity;
      const datatanggal = data[0].tanggal;
      const datahargatotal = data[0].hargatotal;
      const dataid_karyawan = data[0].id_karyawan;

      // Assign response data to state "transaksi"
      setFormValue({
        id: dataid,
        idproduk: dataidproduk,
        quantity: dataquantity,
        tanggal: datatanggal,
        hargatotal: datahargatotal,
        id_karyawan: dataid_karyawan,
      });
    } catch (error) {
      console.log(error);
      alert("Data tidak ditemukan atau sudah dihapus!");
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make axios delete request
      await axios.delete(
        `https://localhost:7142/transaksi/TransaksiDelete?id=${id}`
      );

      // Redirect back to the master data after successful deletion
      window.location.href = "/datatransaksi";

      alert("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data Transaksi : {formValue.id}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder={`ID: ${formValue.id}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="idproduk"
              placeholder={`ID PRODUK: ${formValue.idproduk}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="quantity"
              placeholder={`QUANTITY: ${formValue.quantity}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="date"
              name="tanggal"
              placeholder={`TANGGAL: ${formValue.tanggal}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="hargatotal"
              placeholder={`HARGA TOTAL: ${formValue.hargatotal}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="id_karyawan"
              placeholder={`STATUS: ${formValue.id_karyawan}`}
              readOnly
            />
            <br />
            <br />
            <button type="submit" className="btn btn-danger">
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransaksiDelete;
