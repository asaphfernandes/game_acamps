using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;

namespace Api.Controllers.Provas.Create
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    private DbGameContext Context { get; }

    public async Task CreateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      if (!string.IsNullOrEmpty(viewModel.Name))
      {
        var prova = new Prova(viewModel.Name);

        await Context.Set<Prova>().InsertOneAsync(prova, cancellationToken: cancellationToken);
      }
    }
  }
}
