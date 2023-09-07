namespace Api.Colletions
{
  /// <summary>
  /// O tempo é grava em segundos
  /// </summary>
  public class Prova : BaseColletion
  {
    public enum ETipo : short
    {
      Tempo = 1,
      Pontos = 2
    }
    public ETipo Tipo { get; private set; }
    public string TipoNome { get; private set; }
    public string Name { get; private set; }
    public int Tempo { get; private set; }
    public int Punicao { get; private set; }

    public Prova(ETipo tipo, string name, int tempo, int punicao) : base()
    {
      Tipo = tipo;
      TipoNome = tipo.ToString();
      Name = name;
      Tempo = tempo;
      Punicao = punicao;
    }
  }
}
