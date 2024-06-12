import "./Produk.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProdukDelete() {
  const { id } = useParams();

  // Define state
  const [formValue, setFormValue] = useState({
    id: "",
    namaproduk: "",
    stock: "",
    hargasatuan: "",
  });

  // useEffect hook
  useEffect(() => {
    // Panggil method "fetchData"
    fetchData();
  }, []);

  // Function "fetchData"
  const fetchData = async () => {
    try {
      // Fetching data
      const response = await axios.get(`https://localhost:7142/produk/ProdukGetById?id=${id}`);

      // Get response data
      const data = await response.data;
      const datanim= data[0].nim
      const datanama= data[0].nama
    

      // Assign response data to state "formValue"
      setFormValue({
        nim: datanim,
        nama: datanama,
      });
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
      // Make axios delete request
      await axios.delete(`https://localhost:7142/produk/ProdukDelete?id=${id}`);

      // Redirect kembali ke master data setelah penghapusan berhasil
      window.location.href = "/dataproduk";

      alert("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data Produk : {formValue.namaproduk}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder={`ID: ${id}`}
              onChange={handleChange}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="namaproduk"
              placeholder={`Nama Produk: ${formValue.namaproduk}`}
              onChange={handleChange}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="stock"
              placeholder={`Stock: ${formValue.stock}`}
              onChange={handleChange}
              readOnly
            />
            <br />
            <br />
            <input
              type="number"
              name="hargasatuan"
              placeholder={`Harga Satuan: ${formValue.hargasatuan}`}
              onChange={handleChange}
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

export default ProdukDelete;
