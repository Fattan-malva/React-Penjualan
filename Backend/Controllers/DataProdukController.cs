using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

[ApiController]
public class DataProdukController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public DataProdukController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration); 
    }

    // Get: api/dataproduk
    [HttpGet("produk/ProdukGet")]
    public IActionResult GetDataProduk()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllDataproduks();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Get: api/dataproduk/{id}
    
    [HttpGet("produk/ProdukGetById")]
    public IActionResult GetDataprodukById(int id)
    {
        try
        {
            var dataProduk = _dbManager.GetDataprodukById(id);
            if (dataProduk != null)
            {
                response.status = 200;
                response.message = "Success";
                response.data = dataProduk;
            }
            else
            {
                response.status = 404;
                response.message = "Data not found";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Post: api/dataproduk
    [HttpPost("produk/ProdukAdd")]
    public IActionResult CreateDataproduk([FromBody] Dataproduk dataProduk)
    {
        try
        {
            if (_dbManager.GetDataProduk(dataProduk) == 1)
            {
                _dbManager.UpdateDataProduk(dataProduk);
            }
            else
            {
                _dbManager.CreateDataproduk(dataProduk);
            }
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

    // Put: api/dataproduk/{id}
    [HttpPut("produk/ProdukEdit")]
    public IActionResult UpdateDataproduk(int id, [FromBody] Dataproduk dataProduk)
    {
        try
        {
            var existingDataProduk = _dbManager.GetDataprodukById(id);
            if (existingDataProduk != null)
            {
                _dbManager.UpdateDataProduk(dataProduk);
                response.status = 200;
                response.message = "Success";
            }
            else
            {
                response.status = 404;
                response.message = "Data not found";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Delete: api/dataproduk/{id}
    
    [HttpDelete("produk/ProdukDelete")]
    public IActionResult DeleteDataproduk(int id)
    {
        try
        {
            var existingDataProduk = _dbManager.GetDataprodukById(id);
            if (existingDataProduk != null)
            {
                _dbManager.DeleteDataProduk(id);
                response.status = 200;
                response.message = "Success";
            }
            else
            {
                response.status = 404;
                response.message = "Data not found";
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
