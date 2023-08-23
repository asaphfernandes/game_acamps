using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Resultados.Zerar
{
  [Route("api/resultado")]
  public class Controller : BaseController
  {
    public Controller(Service service)
    {
      Service = service;
    }

    public Service Service { get; }

    [HttpPost, Route("zerar")]
    public async Task<IActionResult> ZerarAsync(CancellationToken cancellationToken)
    {
      await Service.ZerarAsync(cancellationToken);
      return Ok();
    }
  }
}
