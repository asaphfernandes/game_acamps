using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Resultados.Manutencao
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    public DbGameContext Context { get; }

    public async Task<List<Resultado>> GetAsync(string provaNome, CancellationToken cancellationToken)
    {
      return await Context.Set<Resultado>().Find(w => w.ProvaNome == provaNome).SortBy(o => o.EquipeNome).ToListAsync(cancellationToken);
    }

    public async Task UpdateAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      var resultado = await Context.Set<Resultado>().Find(o => o.Id == viewModel.Id).FirstOrDefaultAsync(cancellationToken);

      resultado.Update(viewModel.Tempo, viewModel.Punicao);

      await Context.Set<Resultado>().ReplaceOneAsync(o => o.Id == viewModel.Id, resultado, cancellationToken: cancellationToken);
    }
  }
}
