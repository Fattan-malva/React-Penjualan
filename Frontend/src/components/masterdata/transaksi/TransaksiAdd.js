import "./Transaksi.css";
import axios from "axios";
import React from "react";

function TransaksiAdd() {
  const [formValue, setFormValue] = React.useState({
    id: "",
    idproduk: "",
    quantity: "",
    tanggal: "",
    hargatotal: "",
    id_karyawan: "",
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
        'https://localhost:7142/transaksi/TransaksiAdd',
        {
          id: formValue.id,
          idproduk: formValue.idproduk,
          quantity: formValue.quantity,
          tanggal: formValue.tanggal,
          hargatotal: formValue.hargatotal,
          id_karyawan: formValue.id_karyawan,
      
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = "/datatransaksi";

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
        <div className="Titel">Tambah Data Transaksi</div>
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
              type="number"
              name="idproduk"
              placeholder="Enter ID Produk"
              value={formValue.idproduk}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              value={formValue.quantity}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="date"
              name="tanggal"
              placeholder="Enter Tanggal"
              value={formValue.tanggal}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="number"
              name="hargatotal"
              placeholder="Enter Harga Total"
              value={formValue.hargatotal}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="number"
              name="id_karyawan"
              placeholder="Enter ID Karyawan"
              value={formValue.id_karyawan}
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

export default TransaksiAdd;
