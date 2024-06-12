import "./Karyawan.css";
import axios from "axios";
import React from "react";

function KaryawanAdd() {
  const [formValue, setformValue] = React.useState({
    id:"",
    nama_karyawan: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    noTlp   : "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async () => {
    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("id", formValue.id);
    FormDataInput.append("nama_karyawan", formValue.nama_karyawan);
    FormDataInput.append("tgl_lahir", formValue.tgl_lahir);
    FormDataInput.append("jenis_kelamin", formValue.jenis_kelamin);
    FormDataInput.append("alamat", formValue.alamat);
    FormDataInput.append("noTlp", formValue.noTlp);

    alert("Data berhasil disimpan");
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:7142/karyawan/KaryawanGet",
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Tambah Data Karyawan</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              placeholder="enter Id"
              value={formValue.id}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_karyawan"
              placeholder="enter a Nama"
              value={formValue.nama_karyawan}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="tgl_lahir"
              placeholder="enter a tgl_lahir"
              value={formValue.tgl_lahir}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="jenis_kelamin"
              placeholder="enter a jenis_kelamin"
              value={formValue.jenis_kelamin}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="alamat"
              placeholder="enter a alamat"
              value={formValue.alamat}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="noTlp"
              placeholder="enter a noTlp"
              value={formValue.noTlp}
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

    export default KaryawanAdd;
