using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Resultados.Manutencao
{
  [Route("api/resultado")]
  public class Controller: BaseController
  {
    public Controller(Service service) : base()
    {
      Service = service;
    }

    private Service Service { get; }

    [HttpGet, Route("manutencao/{provaNome}")]
    public async Task<IActionResult> GetAsync(string provaNome, CancellationToken cancellationToken)
    {
      var response = await Service.GetAsync(provaNome, cancellationToken);
      return Json(response);
    }

    [HttpPost("manutencao")]
    public async Task<IActionResult> ManutencaoAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      await Service.UpdateAsync(viewModel, cancellationToken);
      return Ok();
    }
  }
}
