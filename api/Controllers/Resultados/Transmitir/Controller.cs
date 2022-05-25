using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Resultados.Transmitir
{
  [Route("api/resultado")]
  public class Controller : BaseController
  {
    public Controller(Service service) : base()
    {
      Service = service;
    }

    private Service Service { get; }

    [HttpPost("transmitir")]
    public async Task<IActionResult> TransmitirAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      await Service.TransmitirAsync(viewModel, cancellationToken);
      return Ok();
    }
  }
}
