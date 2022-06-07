using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

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
      var resultado = await Context.Set<Resultado>().AsQueryable().SingleOrDefaultAsync(cancellationToken);

      if (resultado == null)
      {
        resultado = new Resultado();
        await Context.Set<Resultado>().InsertOneAsync(resultado, cancellationToken: cancellationToken);
      }

      resultado.AddProva(new Resultado.SubProva(viewModel.Id)
      {
        Equipes = viewModel.Equipes
        .Select(s => new Resultado.SubEquipe(s.Id, s.Name)
        {
          PenalidadeSeconds = s.PenalidadeSeconds,
          TimeMiliseconds = s.TimeMiliseconds
        }).ToList()
      });

      await Context.Set<Resultado>().ReplaceOneAsync(w => w.Id == resultado.Id, resultado, cancellationToken: cancellationToken);
    }
  }
}
