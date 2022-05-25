using System;
using System.Collections.Generic;

namespace Api.Controllers.Resultados.Transmitir
{
  public class RequestViewModel
  {
    public Guid Id { get; set; }
    public List<SubEquipe> Equipes { get; set; } = new List<SubEquipe>();

    public class SubEquipe
    {
      public Guid Id { get; set; }
      public int PenalidadeSeconds { get; set; }
      public int TimeMiliseconds { get; set; }
    }
  }
}
