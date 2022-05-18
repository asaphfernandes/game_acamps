using System;

namespace Api.Colletions
{
  public class Equipe : BaseColletion
  {
    public string Name { get; private set; }
    public int Sort { get; private set; }

    public Equipe(string name, int sort) : base()
    {
      Name = name;
      Sort = sort;
    }

    public void UpdateSort(int sort) => Sort = sort;

    public void Sortear() => Sort = new Random().Next();
  }
}
