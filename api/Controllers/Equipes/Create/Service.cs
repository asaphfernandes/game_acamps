using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;

namespace Api.Controllers.Equipes.Create
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
      if (!string.IsNullOrEmpty(viewModel.Name))
      {
        var equipe = new Equipe(name: viewModel.Name, lider: viewModel.Lider);

        await Context.Set<Equipe>().InsertOneAsync(equipe, cancellationToken: cancellationToken);
      }
    }
  }
}
