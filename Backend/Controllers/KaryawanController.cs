using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

[ApiController]
public class KaryawanController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public KaryawanController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // Get all Karyawan
    [HttpGet("karyawan/KaryawanGet")]
    public IActionResult GetKaryawan()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllKaryawan();
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Get Karyawan by ID
    [HttpGet("karyawan/KaryawanGetById/{id}")]
    public IActionResult GetKaryawanById(int id)
    {
        try
        {
            var karyawan = _dbManager.GetKaryawanById(id);
            if (karyawan == null)
            {
                response.status = 404;
                response.message = "Not Found";
            }
            else
            {
                response.status = 200;
                response.message = "Success";
                response.data = karyawan;
            }
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Create Karyawan
    // Post
[HttpPost("karyawan/KaryawanAdd")]
public IActionResult CreateKaryawan([FromBody] Karyawan data_karyawan)
{
    try
    {
        var karyawanExists = _dbManager.GetKaryawan(data_karyawan) == 1;
        if (karyawanExists)
        {
            response.message = "Karyawan already exists. Updating existing record.";
            _dbManager.UpdateKaryawan(data_karyawan.id, data_karyawan);
        }
        else
        {
            _dbManager.CreateKaryawan(data_karyawan);
            response.message = "Karyawan created successfully.";
        }
        response.status = 200;
    }
    catch (Exception ex)
    {
        response.status = 500;
        response.message = $"Error: {ex.Message}";
    }
    return Ok(response);
}


    // Update Karyawan
    [HttpPut("karyawan/KaryawanUpdate/{id}")]
    public IActionResult UpdateKaryawan(int id, [FromBody] Karyawan data_karyawan)
    {
        try
        {
            var result = _dbManager.UpdateKaryawan(id, data_karyawan);
            if (result > 0)
            {
                response.status = 200;
                response.message = "Success";
            }
            else
            {
                response.status = 404;
                response.message = "Not Found";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Delete Karyawan
    [HttpDelete("karyawan/KaryawanDelete/{id}")]
    public IActionResult DeleteKaryawan(int id)
    {
        try
        {
            var result = _dbManager.DeleteKaryawan(id);
            if (result)
            {
                response.status = 200;
                response.message = "Success";
            }
            else
            {
                response.status = 404;
                response.message = "Not Found";
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