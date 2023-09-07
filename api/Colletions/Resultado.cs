using System;

namespace Api.Colletions
{
  public class Resultado : BaseColletion
  {
    public string EquipeNome { get; private set; }
    public string EquipeLider { get; private set; }
    public string ProvaNome { get; private set; }
    public int Tempo { get; private set; }
    public int Penalidade { get; private set; }

    public Resultado(Equipe equipe, Prova prova) : base()
    {
      EquipeNome = equipe.Name;
      EquipeLider = equipe.Lider;
      ProvaNome = prova.Name;

      if (prova.Tipo == Prova.ETipo.Tempo)
        Tempo = prova.Tempo * 1000;
      else
        Tempo = 0;

      Penalidade = 0;
    }

    public void Update(int tempo, int punicaoSeconds)
    {
      Tempo = tempo;
      Penalidade = punicaoSeconds * 1000;
    }
  }
}
