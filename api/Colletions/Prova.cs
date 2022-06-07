namespace Api.Colletions
{
  public class Prova : BaseColletion
  {
    public string Name { get; private set; }
    public int Punicao { get; private set; }
    public int Bonus { get; private set; }

    public Prova(string name, int punicao, int bonus) : base()
    {
      Name = name;
      Punicao = punicao;
      Bonus = bonus;
    }
  }
}
