using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Resultados.Home
{
  [Route("api/resultado")]
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
      var resultado = await Context.Set<Resultado>().AsQueryable().ToListAsync(cancellationToken);


      return Json(resultado);
    }
  }
}
