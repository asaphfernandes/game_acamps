using System;
using System.Collections.Generic;

namespace Api.Controllers.Resultados.Transmitir
{
  public class RequestViewModel
  {
    public string ProvaNome { get; set; }
    public List<SubEquipe> Equipes { get; set; } = new List<SubEquipe>();

    public class SubEquipe
    {
      public string EquipeNome { get; set; }
      public int TimeMiliseconds { get; set; }
      public int PenalidadeSeconds { get; set; }
    }
  }
}
