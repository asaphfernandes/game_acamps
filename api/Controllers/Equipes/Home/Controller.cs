using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Equipes.Home
{
  [Route("api/equipe")]
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
      var response = await Context.Set<Equipe>()
        .AsQueryable()
        .OrderBy(o => o.Name)
        .ToListAsync(cancellationToken);

      return Json(response);
    }
  }
}
