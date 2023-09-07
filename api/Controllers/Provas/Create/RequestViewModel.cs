using Api.Colletions;

namespace Api.Controllers.Provas.Create
{
  public class RequestViewModel
  {
    public Prova.ETipo Tipo { get; set; }
    public string Name { get; set; }
    public int Tempo { get; set; }
    public int? Punicao { get; set; }
  }
}
