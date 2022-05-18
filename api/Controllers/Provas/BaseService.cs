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
      var countProvas = await Context.Set<Prova>().AsQueryable().CountAsync(cancellationToken);
      var equipes = await Context.Set<Equipe>().AsQueryable().ToListAsync(cancellationToken);

      var countEquipes = countProvas * 2;
      var aux = countEquipes - equipes.Count;

      if (aux > 0)
      {
        var maxEquipe = equipes
          .OrderByDescending(o => o.Sort)
          .Select(s => s.Sort)
          .FirstOrDefault();

        for (int i = 0; i < aux; i++)
        {
          ++maxEquipe;
          var equipe = new Equipe($"[Equipe {maxEquipe}]", maxEquipe);
          await Context.Set<Equipe>().InsertOneAsync(equipe, cancellationToken: cancellationToken);
        }
      }

      if (aux < 0)
      {
        var deletes = equipes
          .OrderBy(o => o.Name)
          .OrderByDescending(o => o.Sort).ToList();

        foreach (var delete in deletes)
          await Context.Set<Equipe>().DeleteOneAsync(w => w.Id == delete.Id, cancellationToken);
      }
    }
  }
}
