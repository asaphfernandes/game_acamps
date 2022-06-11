using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Provas
{
  public abstract class BaseService
  {
    public BaseService(DbGameContext context)
    {
      Context = context;
    }

    protected DbGameContext Context { get; }

    protected async Task GeneratedEquipesAsync(CancellationToken cancellationToken)
    {
      var provas = await Context.Set<Prova>().AsQueryable().ToListAsync(cancellationToken);
      var equipes = await Context.Set<Equipe>().AsQueryable().ToListAsync(cancellationToken);

      foreach (var equipe in equipes)
        await Context.Set<Equipe>().DeleteOneAsync(w => w.Id == equipe.Id, cancellationToken);

      var countEquipes = provas.Count * 2;
      var aux = 1;

      foreach (var prova in provas)
      {
        var equipe1 = new Equipe($"[Equipe {aux}]", prova.Name, aux);
        await Context.Set<Equipe>().InsertOneAsync(equipe1, cancellationToken: cancellationToken);

        var equipe2 = new Equipe($"[Equipe {aux + provas.Count}]", prova.Name, aux + provas.Count);
        await Context.Set<Equipe>().InsertOneAsync(equipe2, cancellationToken: cancellationToken);

        aux++;
      }
    }
  }
}
