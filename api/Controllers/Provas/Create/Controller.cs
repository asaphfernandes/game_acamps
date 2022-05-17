using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Provas.Create
{
  [Route("api/prova")]
  public class Controller : BaseController
  {
    public Controller(Service service) : base()
    {
      Service = service;
    }

    private Service Service { get; }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      await Service.CreateAsync(viewModel, cancellationToken);
      return Ok();
    }
  }
}
