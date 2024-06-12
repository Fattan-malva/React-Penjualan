import "./Produk.css";
import axios from "axios";
import React from "react";

function ProdukAdd() {
  const [formValue, setFormValue] = React.useState({
    id: "",
    namaproduk: "",
    stock: "",
    hargasatuan: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make axios post request
      const response = await axios.post(
        "https://localhost:7142/produk/ProdukAdd",
        {
          id: formValue.id,
          namaproduk: formValue.namaproduk,
          stock: formValue.stock,
          hargasatuan: formValue.hargasatuan,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = "/dataproduk";

      console.log(response);
      alert("Data berhasil disimpan");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data Produk</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder="Enter ID"
              value={formValue.id}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="namaproduk"
              placeholder="Enter Nama Produk"
              value={formValue.namaproduk}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={formValue.stock}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="number"
              name="hargasatuan"
              placeholder="Enter Harga satuan"
              value={formValue.hargasatuan}
              onChange={handleChange}
              required
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

export default ProdukAdd;
