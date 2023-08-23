using System;

namespace Api.Controllers.Resultados.Manutencao
{
  public class RequestViewModel
  {
    public Guid Id { get; set; }
    public int Tempo { get; set; }
    public int Punicao { get; set; }
  }
}
