using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

[ApiController]
public class DataTransaksiController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public DataTransaksiController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration); 
    }

    // Get all transactions
    
    [HttpGet("transaksi/TransaksiGet")]
    public IActionResult GetDataTansaksi()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllDatatransaksis();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Get transaction by ID
    [HttpGet("transaksi/TransaksiGetById")]
    public IActionResult GetDatatransaksiById(int id)
    {
        try
        {
            var dataTransaksi = _dbManager.GetDatatransaksiById(id);
            if (dataTransaksi == null)
            {
                response.status = 404;
                response.message = "Data not found";
            }
            else
            {
                response.status = 200;
                response.message = "Success";
                response.data = dataTransaksi;
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Create a new transaction
    
    [HttpPost("transaksi/TransaksiAdd")]
    public IActionResult CreateDatatransaksi([FromBody] Datatransaksi dataTransaksi)
    {
        try
        {
            _dbManager.CreateDatatransaksi(dataTransaksi);
            response.status = 200;
            response.message = "Success";
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Update an existing transaction
    
    [HttpPut("transaksi/TransaksiEdit")]
    public IActionResult UpdateDatatransaksi(int id, [FromBody] Datatransaksi dataTransaksi)
    {
        try
        {
            var existingData = _dbManager.GetDatatransaksiById(id);
            if (existingData == null)
            {
                response.status = 404;
                response.message = "Data not found";
            }
            else
            {
                _dbManager.UpdateDatatransaksi(id, dataTransaksi);
                response.status = 200;
                response.message = "Success";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Delete a transaction
    [HttpDelete("transaksi/TransaksiDelete")]
    public IActionResult DeleteDatatransaksi(int id)
    {
        try
        {
            var existingData = _dbManager.GetDatatransaksiById(id);
            if (existingData == null)
            {
                response.status = 404;
                response.message = "Data not found";
            }
            else
            {
                _dbManager.DeleteDatatransaksi(id);
                response.status = 200;
                response.message = "Success";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}
