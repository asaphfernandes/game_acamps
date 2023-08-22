using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [ApiController, Route("/")]
  public class HomeController : Controller
  {
    [HttpGet]
    public string Get()
    {
      return "Api game acamps";
    }
  }
}
