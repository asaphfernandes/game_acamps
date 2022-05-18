using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Colletions;
using Api.Contexts;
using MongoDB.Driver;

namespace Api.Controllers.Provas.Delete
{
  public class Service : BaseService
  {
    public Service(DbGameContext context) : base(context)
    {
    }

    public async Task CreateAsync(Guid id, CancellationToken cancellationToken)
    {
      await Context.Set<Prova>().DeleteOneAsync(w => w.Id == id, cancellationToken);
      await GeneratedEquipesAsync(cancellationToken);
    }
  }
}
