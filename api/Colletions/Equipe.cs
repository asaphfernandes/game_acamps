using System.Runtime.Serialization;

namespace Api.Colletions
{
  public class Equipe : BaseColletion
  {
    public string Name { get; private set; }

    public string Lider { get; private set; }

    public int Tempo { get; private set; }
    public int Posicao { get; private set; }

    public Equipe(string name, string lider) : base()
    {
      Name = name;
      Lider = lider;
    }

    public void Update(string name, string lider)
    {
      Name = name;
      Lider = lider;
    }

    public bool UpdateTempo(int tempo)
    {
      var isUpdated = Tempo != tempo;
      Tempo = tempo;
      return isUpdated;
    }

    public bool UpdatePosicao(int posicao)
    {
      var isUpdated = Posicao != posicao;
      Posicao = posicao;
      return isUpdated;
    }
  }
}
