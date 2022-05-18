using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Equipes.Sortear
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    private DbGameContext Context { get; }

    public async Task SortearAsync(CancellationToken cancellationToken)
    {
      var equipes = await Context.Set<Equipe>().AsQueryable().ToListAsync(cancellationToken);
      equipes.ForEach(equipe => equipe.Sortear());

      equipes = equipes.OrderBy(o => o.Sort).ToList();

      var aux = 1;
      foreach (var equipe in equipes)
      {
        equipe.UpdateSort(aux);
        aux++;

        await Context.Set<Equipe>().ReplaceOneAsync(w => w.Id == equipe.Id, equipe, cancellationToken: cancellationToken);
      }
    }
  }
}
