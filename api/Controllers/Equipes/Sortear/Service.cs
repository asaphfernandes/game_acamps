using System.Collections.Generic;
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
    private List<Prova> _provas;
    public async Task SortearAsync(CancellationToken cancellationToken)
    {
      _provas = await Context.Set<Prova>().AsQueryable().ToListAsync(cancellationToken);
      var equipes = await Context.Set<Equipe>().AsQueryable().ToListAsync(cancellationToken);

      var equipe1s = equipes.Where(w => w.Sort % 2 == 1).ToList();
      var equipe2s = equipes.Where(w => w.Sort % 2 == 0).ToList();

      await SortearByEquipe(0, equipe1s, cancellationToken);
      await SortearByEquipe(1, equipe2s, cancellationToken);
    }

    private async Task SortearByEquipe(int posStart, List<Equipe> equipes, CancellationToken cancellationToken)
    {
      equipes.ForEach(equipe => equipe.Sortear());
      equipes = equipes.OrderBy(o => o.Sort).ToList();

      var equipeAux = 1 + posStart;
      var provaAux = 0;
      foreach (var equipe in equipes)
      {
        var prova = _provas[provaAux];
        equipe.UpdateSort(equipeAux, prova.Name);

        equipeAux += 2;
        provaAux++;

        await Context.Set<Equipe>().ReplaceOneAsync(w => w.Id == equipe.Id, equipe, cancellationToken: cancellationToken);
      }
    }
  }
}
