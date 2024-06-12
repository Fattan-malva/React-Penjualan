import "./Karyawan";
import axios from "axios";
import React from "react";

function KaryawanAdd() {
  const [formValue, setFormValue] = React.useState({
    id: "",
    nama_karyawan: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    noTlp: "",
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
        "https://localhost:7142/karyawan/KaryawanAdd",
        {
          id: formValue.id,
          nama_karyawan: formValue.nama_karyawan,
          tgl_lahir: formValue.tgl_lahir,
          jenis_kelamin: formValue.jenis_kelamin,
          alamat: formValue.alamat,
          noTlp: formValue.noTlp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = "/datakaryawan";

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
              name="nama_karyawan"
              placeholder="Enter nama_karyawan"
              value={formValue.nama_karyawan}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="date"
              name="tgl_lahir"
              placeholder="Enter tgl_lahir"
              value={formValue.tgl_lahir}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="jenis_kelamin"
              placeholder="Enter jenis_kelamin"
              value={formValue.jenis_kelamin}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="alamat"
              placeholder="Enter alamat"
              value={formValue.alamat}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="noTlp"
              placeholder="Enter noTlp"
              value={formValue.noTlp}
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

export default KaryawanAdd;
