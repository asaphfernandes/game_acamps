using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;

namespace Api.Controllers.Provas.Create
{
  public class Service : BaseService
  {
    public Service(DbGameContext context) : base(context)
    {
    }

    public async Task CreateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      if (!string.IsNullOrEmpty(viewModel.Name))
      {
        var prova = new Prova(viewModel.Name, viewModel.Punicao, viewModel.Bonus);

        await Context.Set<Prova>().InsertOneAsync(prova, cancellationToken: cancellationToken);

        await GeneratedEquipesAsync(cancellationToken);
      }
    }
  }
}
