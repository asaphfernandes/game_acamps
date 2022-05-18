using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Equipes.Sortear
{
  [Route("api/equipe")]
  public class Controller : BaseController
  {
    public Controller(Service service) : base()
    {
      Service = service;
    }

    private Service Service { get; }

    [HttpPost("sortear")]
    public async Task<IActionResult> SortearAsync(CancellationToken cancellationToken)
    {
      await Service.SortearAsync(cancellationToken);
      return Ok();
    }
  }
}
