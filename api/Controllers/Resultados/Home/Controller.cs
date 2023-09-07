using System.Collections.Generic;
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
      var resultados = await Context.Set<Resultado>().AsQueryable().ToListAsync(cancellationToken);
      var equipes = await Context.Set<Equipe>().AsQueryable().ToListAsync(cancellationToken);
      var provas = await Context.Set<Prova>().AsQueryable().ToListAsync(cancellationToken);

      var updates = new List<Equipe>();

      foreach (var equipe in equipes)
      {
        var equipeResultados = resultados.Where(w => w.EquipeNome == equipe.Name).ToList();
        int tempo = 0;
        foreach (var equipeResultado in equipeResultados)
        {
          var prova = provas.FirstOrDefault(w => w.Name == equipeResultado.ProvaNome);

          if (prova.Tipo == Prova.ETipo.Tempo)
          {
            tempo += equipeResultado.Tempo;
            tempo += equipeResultado.Penalidade;
          }
          else
          {
            tempo -= equipeResultado.Tempo;
          }
        }

        var isUpdate = equipe.UpdateTempo(tempo);
        if (isUpdate)
          updates.Add(equipe);
      }

      var equipePosicoes = equipes.OrderBy(o => o.Tempo).ToList();
      var posicao = 0;
      foreach (var equipe in equipePosicoes)
      {
        var isUpdate = equipe.UpdatePosicao(++posicao);

        if (isUpdate && !updates.Any(w => w.Id == equipe.Id))
          updates.Add(equipe);
      }

      foreach (var equipe in updates)
        await Context.Set<Equipe>().ReplaceOneAsync(o => o.Id == equipe.Id, equipe, cancellationToken: cancellationToken);

      return Json(equipePosicoes);
    }
  }
}
