using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Provas.Delete
{
  public class Service
  {
    public Service(DbGameContext context)
    {
      Context = context;
    }

    private DbGameContext Context { get; }

    public async Task CreateAsync(Guid id, CancellationToken cancellationToken)
    {
      await Context.Set<Prova>().DeleteOneAsync(w => w.Id == id, cancellationToken);
    }
  }
}
