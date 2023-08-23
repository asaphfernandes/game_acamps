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
      Tempo = prova.Tempo;
      Penalidade = 0;
    }

    public void Update(int tempo, int punicao)
    {
      Tempo = tempo;
      Penalidade = punicao;
    }
  }
}
