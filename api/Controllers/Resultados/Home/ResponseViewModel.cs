using System.Collections.Generic;

namespace Api.Controllers.Resultados.Home
{
  public class ResponseViewModel
  {
    public string LastChange { get; set; }
    public List<SubEquipe> Equipes { get; set; } = new List<SubEquipe>();

    public class SubEquipe
    {
      public string Name { get; internal set; }
      public string Penalidde { get; set; }
      public string Bonus { get; internal set; }
      public string Diferenca { get; set; }
      public string Total { get; set; }
    }
  }
}
