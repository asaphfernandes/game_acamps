using MongoDB.Driver;

namespace Api.Contexts
{
  public abstract class MongoDbContext
  {
    public MongoDbContext(MongoDbSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);

      Database = client.GetDatabase(DatabaseName);
    }

    protected IMongoDatabase Database { get; }
    protected abstract string DatabaseName { get; }

    public IMongoCollection<TModel> Set<TModel>()
    {
      return Database.GetCollection<TModel>(typeof(TModel).Name);
    }

    public IMongoCollection<TModel> Set<TModel>(string name)
    {
      return Database.GetCollection<TModel>(name);
    }
  }
}
