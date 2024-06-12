import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Contact from "./components/contact/Contact";
import Documentasi from "./components/documentasi/Documentasi";
import UserList from "./views/UserList";
import DataProduk from "./components/masterdata/produk/Produk";
import ProdukAdd from "./components/masterdata/produk/ProdukAdd";
import ProdukEdit from "./components/masterdata/produk/ProdukEdit";
import ProdukDelete from "./components/masterdata/produk/ProdukDelete";
import DataTransaksi from "./components/masterdata/transaksi/Transaksi";
import TransaksiAdd from "./components/masterdata/transaksi/TransaksiAdd";
import TransaksiEdit from "./components/masterdata/transaksi/TransaksiEdit";
import TransaksiDelete from "./components/masterdata/transaksi/TransaksiDelete";

function App() {
	return (
		<Router>
			<div className="app-header">
				<Menu />
			</div>
			<div className="app-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/documentasi" element={<Documentasi />} />
					<Route path="/userList" element={<UserList />} />
					<Route path="/dataProduk" element={<DataProduk />} />
					<Route path="/dataTransaksi" element={<DataTransaksi />} />
					<Route path="/dataproduk_add" element={<ProdukAdd />} />
					<Route path="/dataproduk_edit/:id" element={<ProdukEdit />} />
					<Route path="/dataproduk_delete/:id" element={<ProdukDelete />} />
					<Route path="/datatransaksi_add" element={<TransaksiAdd />} />
					<Route path="/datatransaksi_edit/:id" element={<TransaksiEdit />} />
					<Route path="/datatransaksi_delete/:id" element={<TransaksiDelete />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;