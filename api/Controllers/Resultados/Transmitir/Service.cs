using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers.Resultados.Transmitir
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    private DbGameContext Context { get; }

    public async Task TransmitirAsync(RequestViewModel viewModel, CancellationToken cancellationToken)
    {
      var resultados = await Context.Set<Resultado>().AsQueryable().Where(w => w.ProvaNome == viewModel.ProvaNome).ToListAsync(cancellationToken);

      foreach (var equipe in viewModel.Equipes)
      {
        var resultado = resultados.Single(w => w.EquipeNome == equipe.Name);
        resultado.Update(equipe.TimeMiliseconds, equipe.PenalidadeSeconds);
        await Context.Set<Resultado>().ReplaceOneAsync(o => o.Id == resultado.Id, resultado, cancellationToken: cancellationToken);
      }
    }
  }
}
