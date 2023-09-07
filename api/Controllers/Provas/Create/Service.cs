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

    public DbGameContext Context { get; }

    public async Task CreateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      var prova = new Prova(viewModel.Tipo, viewModel.Name, viewModel.Tempo, viewModel.Punicao ?? 0);

      await Context.Set<Prova>().InsertOneAsync(prova, cancellationToken: cancellationToken);
    }
  }
}
