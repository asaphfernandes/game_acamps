namespace Api.Colletions
{
  public class Equipe : BaseColletion
  {
    public string Name { get; private set; }

    public string Lider { get; private set; }

    public Equipe(string name, string lider) : base()
    {
      Name = name;
      Lider = lider;
    }

    internal void Update(string name, string lider)
    {
      Name = name;
      Lider = lider;
    }
  }
}
