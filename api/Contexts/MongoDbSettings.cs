namespace Api.Contexts
{
  public class MongoDbSettings
  {
    public MongoDbSettings(string connectionString)
    {
      ConnectionString = connectionString;
    }

    public string ConnectionString { get; }
  }
}
