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

      var response = new ResponseViewModel
      {
        LastChange = $"{resultado.LastChange}"
      };

      foreach (var equipe in resultado.Equipes)
      {
        response.Equipes.Add(new ResponseViewModel.SubEquipe
        {
          Name = equipe.Name,
          Penalidde = $"{equipe.PenalidadeSeconds:00}s",
          Bonus = $"{equipe.BonificacaoSeconds:00}s",
          Diferenca = "",
          Total = $"{new System.TimeOnly(equipe.TotalMiliseconds * 10000):HH:mm:ss.ffff}"
        });
      }

      return Json(response);
    }
  }
}
