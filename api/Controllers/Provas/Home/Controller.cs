using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Provas.Home
{
  [Route("api/prova")]
  public class Controller : BaseController
  {
    public Controller(DbGameContext context) : base()
    {
      Context = context;
    }

    private DbGameContext Context { get; }

    [HttpGet]
    public async Task<IActionResult> IndexAsync(CancellationToken cancellationToken)
    {
      var response = await Context.Set<Prova>()
        .AsQueryable()
        .OrderBy(o => o.Name)
        .ToListAsync(cancellationToken);

      return Json(response);
    }
  }
}
