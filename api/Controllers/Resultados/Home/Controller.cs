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
      var resultado = await Context.Set<Resultado>()
        .AsQueryable()
        .SingleOrDefaultAsync(cancellationToken);

      var equipes = await Context.Set<Equipe>()
        .AsQueryable()
        .ToListAsync(cancellationToken);

      var response = new
      {
        LastChange = $"{resultado.LastChange}",
        Equipes = resultado.Equipes.Select(s => new
        {
          s.Name,
          Penalidde = $"{s.PenalidadeSeconds:00}s",
          Diferenca = "",
          Total = $"{new System.TimeOnly(s.TotalMiliseconds * 10000):HH:mm:ss.ffff}"
        }).ToList()
      };

      return Json(response);
    }
  }
}
