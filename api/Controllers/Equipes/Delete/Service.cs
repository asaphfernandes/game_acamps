using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Equipes.Delete
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    public DbGameContext Context { get; }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
      await Context.Set<Equipe>().DeleteOneAsync(w => w.Id == id, cancellationToken: cancellationToken);
    }
  }
}
