using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Resultados.Zerar
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    public DbGameContext Context { get; }

    public async Task ZerarAsync(CancellationToken cancellationToken)
    {
      await Context.Set<Resultado>().DeleteManyAsync(o => true, cancellationToken);

      var equipes = await Context.Set<Equipe>().Find(o => true).ToListAsync(cancellationToken);
      var provas = await Context.Set<Prova>().Find(o => true).ToListAsync(cancellationToken);

      var resultados = new List<Resultado>();

      foreach (var equipe in equipes)
      {
        foreach (var prova in provas)
        {
          var resultado = new Resultado(equipe, prova);
          resultados.Add(resultado);
        }
      }

      await Context.Set<Resultado>().InsertManyAsync(resultados, cancellationToken: cancellationToken);
    }

    internal void ZerarAsync()
    {
      throw new NotImplementedException();
    }
  }
}
