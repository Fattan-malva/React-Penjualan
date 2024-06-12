import "./Karyawan.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function KaryawanDelete() {
  const { id } = useParams();
  //define state
 // Define state
 const [karyawan, setKaryawan] = useState({
    id:"",
    nama_karyawan: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    noTlp   : "",
  });


  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    try {
      //fetching
      const response = await axios.get(
        `https://localhost:7278/api/Trainer/TrainerByNim?id=${id}`
      );
      //get response data
      // Get response data
      const data = await response.data;
      const dataid = data[0].id;
      const datanama_karyawan = data[0].nama_karyawan;
      const datatgl_lahir = data[0].tgl_lahir;
      const datajenis_kelamin = data[0].jenis_kelamin;
      const dataalamat = data[0].alamat;
      const datanoTlp = data[0].noTlp;
    

      // Assign response data to state "trainer"
      setKaryawan({
        id: dataid,
        nama_karyawan: datanama_karyawan,
        tgl_lahir: datatgl_lahir,
        jenis_kelamin: datajenis_kelamin,
        alamat: dataalamat,
        noTlp: datanoTlp,

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
      // make axios post request
      await axios.delete(`https://localhost:7278/api/Trainer/Delete?id=${id}`);
      // Redirect back to the master data after successful deletion
      window.location.href = "/datatrainer";

      alert("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data Karyawan {id}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder={`ID:${karyawan.id}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="nama_karyawan"
              placeholder={`NAMA: ${karyawan.nama_karyawan}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="tgl_lahir"
              placeholder={`Tanggal: ${karyawan.tgl_lahir}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="jenis_kelamin"
              placeholder={`PASSWORD: ${karyawan.jenis_kelamin}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="alamat"
              placeholder={`Alamat: ${karyawan.alamat}`}
              readOnly
            />
            <br />
            <br />
            <input
              type="text"
              name="noTlp"
              placeholder={`NO HP: ${karyawan.noTlp}`}
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

export default KaryawanDelete;
