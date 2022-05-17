namespace Api.Colletions
{
  public class Prova : BaseColletion
  {
    public string Name { get; private set; }

    public Prova(string name) : base()
    {
      Name = name;
    }
  }
}
