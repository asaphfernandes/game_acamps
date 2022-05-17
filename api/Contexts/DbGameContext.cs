namespace Api.Contexts
{
  public class DbGameContext : MongoDbContext
  {
    protected override string DatabaseName => "DbGame";

    public DbGameContext(MongoDbSettings settings) : base(settings) { }
  }
}
