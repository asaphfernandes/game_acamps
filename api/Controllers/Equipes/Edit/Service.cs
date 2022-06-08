using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Equipes.Edit
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    public DbGameContext Context { get; }

    public async Task CreateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      var equipe = await Context.Set<Equipe>().AsQueryable().Where(w => w.Id == viewModel.Id).SingleAsync(cancellationToken);

      equipe.UpdateName(viewModel.Name);

      await Context.Set<Equipe>().ReplaceOneAsync(w => w.Id == viewModel.Id, equipe, cancellationToken: cancellationToken);
    }
  }
}
