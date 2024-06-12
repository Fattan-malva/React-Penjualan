import "./Produk.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProdukEdit() {
  const { id } = useParams();
 

  const [formValue, setFormValue] = useState({
    id: "",
    namaproduk: "",
    stock: "",
    hargasatuan: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7142/produk/ProdukGetById?id${id}`);
      const data = await response.data;
      
      const dataid= data[0].id
      const datanamaproduk= data[0].namaproduk
      const datastock= data[0].stock
      const datahargasatuan= data[0].hargasatuan
   
      setFormValue({
        id: dataid,
        namaproduk: datanamaproduk,
        stock: datastock,
        hargasatuan: datahargasatuan,
      });
    } catch (error) {
      console.error(error);
      alert("Data tidak ditemukan!");
    }
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://localhost:7142/produk/ProdukEdit?id=${id}`, // Ganti dengan endpoint yang sesuai untuk menyimpan perubahan
        formValue, // Gunakan formValue langsung sebagai data yang akan dikirim
        { headers: { "Content-Type": "application/json" } }
      );

      // Redirect kembali ke halaman master data setelah perubahan berhasil disimpan
      window.location.href = "/dataproduk";

      alert("Data berhasil diubah");
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Edit Data Produk : {formValue.nama}</div>
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
              name="namaproduk"
              placeholder="Enter Nama Produk"
              value={formValue.namaproduk}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={formValue.stock}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="number"
              name="hargasatuan"
              placeholder="Enter Harga satuan"
              value={formValue.hargasatuan}
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

export default ProdukEdit;
