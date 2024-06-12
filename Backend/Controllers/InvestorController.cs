using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class InvestorController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public InvestorController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // Get
    [HttpGet]
    public IActionResult GetInvestor()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllInvestor();
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
    public IActionResult CreateInvestor([FromBody]Investor data_investor)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            if (_dbManager.GetInvestor(data_investor) == 1)
            {
                _dbManager.UpdateInvestor(data_investor);
            }
            else
            {
                _dbManager.CreateInvestor(data_investor);
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