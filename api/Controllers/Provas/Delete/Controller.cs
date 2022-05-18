using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Provas.Delete
{
  [Route("api/prova")]
  public class Controller : BaseController
  {
    public Controller(Service service) : base()
    {
      Service = service;
    }

    private Service Service { get; }

    [HttpDelete, Route("{id}")]
    public async Task<IActionResult> CreateAsync(Guid id, CancellationToken cancellationToken)
    {
      await Service.CreateAsync(id, cancellationToken);
      return Ok();
    }
  }
}
