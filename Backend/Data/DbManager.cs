using System.Data;
using MySql.Data.MySqlClient;

public class DbManager
{
    private readonly string _connectionString;
    private readonly MySqlConnection _connection;

    public DbManager(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _connection = new MySqlConnection(_connectionString);
    }

    public class DBManager
{
    private string _connectionString;

    public DBManager(string connectionString)
    {
        _connectionString = connectionString;
    }
}
//DATA TRANSASKSI====================================================================================================================================
    public List<Datatransaksi> GetAllDatatransaksis()
    {
        List<Datatransaksi> datatransaksiList = new List<Datatransaksi>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT id, idproduk, quantity, tanggal, hargatotal, id_karyawan FROM Datatransaksi";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Datatransaksi datatransaksi = new Datatransaksi
                        {
                            id = Convert.ToInt32(reader["id"]),
                            idproduk = Convert.ToInt32(reader["idproduk"]),
                            quantity = Convert.ToInt32(reader["quantity"]),
                            tanggal = reader.GetDateTime(reader.GetOrdinal("tanggal")),
                            hargatotal = Convert.ToInt32(reader["hargatotal"]),
                            id_karyawan = Convert.ToInt32(reader["id_karyawan"]),
                        };
                        datatransaksiList.Add(datatransaksi);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        return datatransaksiList;
    }

    public Datatransaksi GetDatatransaksiById(int id)
    {
        Datatransaksi datatransaksi = null;
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT id, idproduk, quantity, tanggal, hargatotal, id_karyawan FROM Datatransaksi WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        datatransaksi = new Datatransaksi
                        {
                            id = Convert.ToInt32(reader["id"]),
                            idproduk = Convert.ToInt32(reader["idproduk"]),
                            quantity = Convert.ToInt32(reader["quantity"]),
                            tanggal = reader.GetDateTime(reader.GetOrdinal("tanggal")),
                            hargatotal = Convert.ToInt32(reader["hargatotal"]),
                            id_karyawan = Convert.ToInt32(reader["id_karyawan"]),
                        };
                    }
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        return datatransaksi;
    }

    public void CreateDatatransaksi(Datatransaksi datatransaksi)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "INSERT INTO Datatransaksi (idproduk, quantity, tanggal, hargatotal, id_karyawan) " +
                               "VALUES (@Idproduk, @Quantity, @Tanggal, @Hargatotal, @Id_karyawan)";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Idproduk", datatransaksi.idproduk);
                command.Parameters.AddWithValue("@Quantity", datatransaksi.quantity);
                command.Parameters.AddWithValue("@Tanggal", datatransaksi.tanggal);
                command.Parameters.AddWithValue("@Hargatotal", datatransaksi.hargatotal);
                command.Parameters.AddWithValue("@Id_karyawan", datatransaksi.id_karyawan);
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public void UpdateDatatransaksi(int id, Datatransaksi datatransaksi)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "UPDATE Datatransaksi " +
                               "SET idproduk = @Idproduk, quantity = @Quantity, tanggal = @Tanggal, hargatotal = @Hargatotal, id_karyawan = @Id_karyawan " +
                               "WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Idproduk", datatransaksi.idproduk);
                command.Parameters.AddWithValue("@Quantity", datatransaksi.quantity);
                command.Parameters.AddWithValue("@Tanggal", datatransaksi.tanggal);
                command.Parameters.AddWithValue("@Hargatotal", datatransaksi.hargatotal);
                command.Parameters.AddWithValue("@Id_karyawan", datatransaksi.id_karyawan);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public void DeleteDatatransaksi(int id)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "DELETE FROM Datatransaksi WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }



    //DATA PRODUK===========================================================================================================================================
     public List<Dataproduk> GetAllDataproduks()
    {
        List<Dataproduk> dataprodukList = new List<Dataproduk>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Dataproduk";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Dataproduk dataproduk = new Dataproduk
                        {
                            id = Convert.ToInt32(reader["id"]),
                            namaproduk = reader["Namaproduk"].ToString(),
                            stock = Convert.ToInt32(reader["Stock"]),
                            hargasatuan = Convert.ToInt32(reader["Hargasatuan"]),
                        };
                        dataprodukList.Add(dataproduk);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return dataprodukList;
    }

    public int CreateDataproduk(Dataproduk dataproduk)
    {
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            string query = "INSERT INTO dataproduk (namaproduk, stock, hargasatuan) VALUES (@Namaproduk, @Stock, @Hargasatuan)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Namaproduk", dataproduk.namaproduk);
                command.Parameters.AddWithValue("@Stock", dataproduk.stock);
                command.Parameters.AddWithValue("@Hargasatuan", dataproduk.hargasatuan);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int GetDataProduk(Dataproduk dataproduk)
    {
        int count = 0;
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            string query = "SELECT COUNT(*) AS count FROM dataproduk WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", dataproduk.id);

                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        count = Convert.ToInt32(reader["count"]);
                    }
                }
            }
        }
        return count;
    }

    public int UpdateDataProduk(Dataproduk dataproduk)
    {
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            string query = "UPDATE dataproduk SET namaproduk = @Namaproduk, stock = @Stock, hargasatuan = @Hargasatuan WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Namaproduk", dataproduk.namaproduk);
                command.Parameters.AddWithValue("@Stock", dataproduk.stock);
                command.Parameters.AddWithValue("@Hargasatuan", dataproduk.hargasatuan);
                command.Parameters.AddWithValue("@Id", dataproduk.id);

                connection.Open();
                try
                {
                    return command.ExecuteNonQuery();
                }
                catch (MySqlException ex)
                {
                    Console.WriteLine($"Error updating dataproduk: {ex.Message}");
                    return -1;
                }
            }
        }
    }

    // New methods for getting, updating, and deleting a product by its ID
    public Dataproduk GetDataprodukById(int id)
    {
        Dataproduk dataproduk = null;
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Dataproduk WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        dataproduk = new Dataproduk
                        {
                            id = Convert.ToInt32(reader["id"]),
                            namaproduk = reader["Namaproduk"].ToString(),
                            stock = Convert.ToInt32(reader["Stock"]),
                            hargasatuan = Convert.ToInt32(reader["Hargasatuan"]),
                        };
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return dataproduk;
    }
    public bool HasRelatedTransactions(int produkId)
{
    int count = 0;
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        string query = "SELECT COUNT(*) AS count FROM datatransaksi WHERE idproduk = @IdProduk";
        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            command.Parameters.AddWithValue("@IdProduk", produkId);
            connection.Open();
            count = Convert.ToInt32(command.ExecuteScalar());
        }
    }
    return count > 0;
}


    public int DeleteDataProduk(int id)
{
    if (HasRelatedTransactions(id))
    {
        // Jika ada transaksi terkait, jangan hapus produk
        throw new InvalidOperationException("Tidak dapat menghapus produk yang memiliki transaksi terkait.");
    }

    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        string query = "DELETE FROM dataproduk WHERE id = @Id";
        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            command.Parameters.AddWithValue("@Id", id);

            connection.Open();
            return command.ExecuteNonQuery();
        }
    }
}


    //Get All Investor
    public List<Investor> GetAllInvestor()
    {
        List<Investor> investorList = new List<Investor>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM data_investor";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Investor data_investor = new Investor
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama = reader["Nama"].ToString(),
                            jumlah = Convert.ToInt32(reader["jumlah"])
                        };
                        investorList.Add(data_investor);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return investorList;
    }

    //Create Investor
    public int CreateInvestor(Investor data_investor)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO data_investor (nama, jumlah) VALUES (@Nama, @Jumlah)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Nama", data_investor.nama);
                command.Parameters.AddWithValue("@Jumlah", data_investor.jumlah);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // Cek apakah data Investor sudah ada apa belom
    public int GetInvestor(Investor data_investor)
    {
        int count = 0;
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            string query = "SELECT count(*) AS count FROM data_investor WHERE nama = @Nama";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Nama", data_investor.nama);

                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        count = Convert.ToInt32(reader["count"]);
                    }
                }
            }
        }
        return count;
    }

    // Update Investor
    public int UpdateInvestor(Investor data_investor)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE data_investor SET jumlah = @Jumlah WHERE nama = @Nama";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Nama", data_investor.nama);
                command.Parameters.AddWithValue("@Jumlah", data_investor.jumlah);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public List<GetAll> GetAll()
    {
        List<GetAll> getAllList = new List<GetAll>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM datatransaksi JOIN dataproduk ON datatransaksi.idproduk = dataproduk.id JOIN data_karyawan ON datatransaksi.id_karyawan = data_karyawan.id";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetAll data_all = new GetAll
                        {
                            id = Convert.ToInt32(reader["id"]),
                            namaproduk = reader["Namaproduk"].ToString(),
                            stock = Convert.ToInt32(reader["Stock"]),
                            hargasatuan = Convert.ToInt32(reader["Hargasatuan"]),
                            quantity = Convert.ToInt32(reader["quantity"]),
                            tanggal = reader.GetDateTime(reader.GetOrdinal("tanggal")),
                            hargatotal = Convert.ToInt32(reader["hargatotal"]),
                            nama_karyawan = reader["nama_karyawan"].ToString(),
                        };
                        getAllList.Add(data_all);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getAllList;
    }


    public List<GetAll> GetAllByDate(string datePattern)
    {
        List<GetAll> getAllList = new List<GetAll>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM datatransaksi JOIN dataproduk ON datatransaksi.idproduk = dataproduk.id WHERE tanggal LIKE @datePattern";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@datePattern", "%" + datePattern + "%");
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetAll data_all = new GetAll
                        {
                            id = Convert.ToInt32(reader["id"]),
                            namaproduk = reader["Namaproduk"].ToString(),
                            stock = Convert.ToInt32(reader["Stock"]),
                            hargasatuan = Convert.ToInt32(reader["Hargasatuan"]),
                            quantity = Convert.ToInt32(reader["quantity"]),
                            tanggal = reader.GetDateTime(reader.GetOrdinal("tanggal")),
                            hargatotal = Convert.ToInt32(reader["hargatotal"]),
                        };
                        getAllList.Add(data_all);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getAllList;
    }
    public List<GetAll> GetAll(string keyword)
    {
        List<GetAll> getAllList = new List<GetAll>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM datatransaksi JOIN dataproduk ON datatransaksi.idproduk = dataproduk.id WHERE dataproduk.Namaproduk LIKE @keyword";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@keyword", "%" + keyword + "%");
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetAll data_all = new GetAll
                        {
                            id = Convert.ToInt32(reader["id"]),
                            namaproduk = reader["Namaproduk"].ToString(),
                            stock = Convert.ToInt32(reader["Stock"]),
                            hargasatuan = Convert.ToInt32(reader["Hargasatuan"]),
                            quantity = Convert.ToInt32(reader["quantity"]),
                            tanggal = reader.GetDateTime(reader.GetOrdinal("tanggal")),
                            hargatotal = Convert.ToInt32(reader["hargatotal"]),
                        };
                        getAllList.Add(data_all);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getAllList;
    }

    //! ================================================================================================ 
    //Get All Karyawan

    public List<Karyawan> GetAllKaryawan()
    {
        List<Karyawan> karyawanList = new List<Karyawan>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM data_karyawan";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Karyawan data_karyawan = new Karyawan
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama_karyawan = reader["nama_karyawan"].ToString(),
                            tgl_lahir = reader["tgl_lahir"].ToString(),
                            jenis_kelamin = reader["jenis_kelamin"].ToString(),
                            alamat = reader["alamat"].ToString(),
                            noTlp = reader["noTlp"].ToString(),
                        };
                        karyawanList.Add(data_karyawan);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return karyawanList;
    }

    // Get karyawan by ID
    public Karyawan GetKaryawanById(int id)
    {
        Karyawan karyawan = null;
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM data_karyawan WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        karyawan = new Karyawan
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama_karyawan = reader["nama_karyawan"].ToString(),
                            tgl_lahir = reader["tgl_lahir"].ToString(),
                            jenis_kelamin = reader["jenis_kelamin"].ToString(),
                            alamat = reader["alamat"].ToString(),
                            noTlp = reader["noTlp"].ToString(),
                        };
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return karyawan;
    }

    // Create new karyawan

    public int CreateKaryawan(Karyawan data_karyawan)
{
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        string query = "INSERT INTO data_karyawan (nama_karyawan, tgl_lahir, jenis_kelamin, alamat, noTlp) VALUES (@Nama_karyawan, @Tgl_lahir, @Jenis_kelamin, @Alamat, @NoTlp)";
        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            command.Parameters.AddWithValue("@Nama_karyawan", data_karyawan.nama_karyawan);
            command.Parameters.AddWithValue("@Tgl_lahir", data_karyawan.tgl_lahir);
            command.Parameters.AddWithValue("@Jenis_kelamin", data_karyawan.jenis_kelamin);
            command.Parameters.AddWithValue("@Alamat", data_karyawan.alamat);
            command.Parameters.AddWithValue("@NoTlp", data_karyawan.noTlp);

            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    command.Transaction = transaction;
                    int result = command.ExecuteNonQuery();
                    transaction.Commit();
                    return result;
                }
                catch (MySqlException ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"Error creating karyawan: {ex.Message}");
                    throw;
                }
            }
        }
    }
}


    // Check if karyawan exists
    public int GetKaryawan(Karyawan data_karyawan)
    {
        int count = 0;
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "SELECT count(*) AS count FROM data_karyawan WHERE nama_karyawan = @Nama_karyawan";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Nama_karyawan", data_karyawan.nama_karyawan);

                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            count = Convert.ToInt32(reader["count"]);
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return count;
    }

    // Update karyawan

    public int UpdateKaryawan(int id, Karyawan karyawan)
{
    try
    {
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            string query = "UPDATE data_karyawan " +
                           "SET nama_karyawan = @Nama_karyawan, tgl_lahir = @Tgl_lahir, jenis_kelamin = @Jenis_kelamin, alamat = @Alamat, noTlp = @NoTlp " +
                           "WHERE id = @Id";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Nama_karyawan", karyawan.nama_karyawan);
            command.Parameters.AddWithValue("@Tgl_lahir", karyawan.tgl_lahir);
            command.Parameters.AddWithValue("@Jenis_kelamin", karyawan.jenis_kelamin);
            command.Parameters.AddWithValue("@Alamat", karyawan.alamat);
            command.Parameters.AddWithValue("@NoTlp", karyawan.noTlp);
            command.Parameters.AddWithValue("@Id", id);
            connection.Open();
            return command.ExecuteNonQuery();
        }
    }
    catch (Exception ex)
    {
        throw ex;
    }
}

    // Delete karyawan
    public bool DeleteKaryawan(int id)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                string query = "DELETE FROM data_karyawan WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting karyawan: {ex.Message}");
            return false;
        }
    }
}




