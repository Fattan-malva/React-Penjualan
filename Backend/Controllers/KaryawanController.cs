using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class KaryawanController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public KaryawanController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // Get
    [HttpGet]
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

    // Post
    [HttpPost]
    public IActionResult CreateKaryawan([FromBody]Karyawan data_karyawan)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            if (_dbManager.GetKaryawan(data_karyawan) == 1)
            {
                _dbManager.UpdateKaryawan(data_karyawan);
            }
            else
            {
                _dbManager.CreateKaryawan(data_karyawan);
            };
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }


}