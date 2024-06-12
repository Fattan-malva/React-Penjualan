using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

[Route("api/[controller]")]
[ApiController]
public class GetAllController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public GetAllController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    //Get : materi
    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAll();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet]
    [Route("ByDate")]
    public IActionResult GetAllIndeksByDate(string datePattern)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllByDate(datePattern);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet]
    [Route("Name")]
    public IActionResult GetAllByDate(string keyword)
    {
        try
        {
            var data = _dbManager.GetAll(keyword);
            return Ok(data);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}