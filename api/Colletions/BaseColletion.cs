using System;

namespace Api.Colletions
{
  public class BaseColletion
  {
    public Guid Id { get; private set; }

    public BaseColletion()
    {
      Id = Guid.NewGuid();
    }

    public BaseColletion(Guid id)
    {
      Id = id;
    }
  }
}
