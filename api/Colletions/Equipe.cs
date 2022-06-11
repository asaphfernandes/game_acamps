using System;

namespace Api.Colletions
{
  public class Equipe : BaseColletion
  {
    public string Name { get; private set; }
    public string ProvaName { get; private set; }
    public int Sort { get; private set; }

    public Equipe(string name, string provaName, int sort) : base()
    {
      Name = name;
      ProvaName = provaName;
      Sort = sort;
    }

    public void UpdateSort(int sort, string provaName)
    {
      Sort = sort;
      ProvaName = provaName;
    }

    public void Sortear() => Sort = new Random().Next();

    internal void UpdateName(string name) => Name = name;
  }
}
