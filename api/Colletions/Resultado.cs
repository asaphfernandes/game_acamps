using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Colletions
{
  public class Resultado : BaseColletion
  {
    public List<SubEquipe> Equipes { get; set; } = new List<SubEquipe>();
    public List<SubProva> Provas { get; set; } = new List<SubProva>();
    public DateTime LastChange { get; set; }

    public Resultado() : base() { }

    public void AddProva(SubProva prova)
    {
      var prova2 = Provas.SingleOrDefault(w => w.Id == prova.Id);

      if (prova2 == null)
      {
        prova2 = new SubProva(prova.Id);
        Provas.Add(prova2);
      }

      prova2.Update(prova);

      CalcRank();
      LastChange = DateTime.Now;
    }

    private void CalcRank()
    {
      var equipes = Provas
        .SelectMany(s => s.Equipes)
        .GroupBy(g => g.Id)
        .Select(s => new SubEquipe(s.Key)
        {
          PenalidadeSeconds = s.Sum(s => s.PenalidadeSeconds),
          TimeMiliseconds = s.Sum(s => s.TimeMiliseconds)
        }).ToList();

      foreach (var equipe in equipes)
      {
        var equipe2 = Equipes.SingleOrDefault(w => w.Id == equipe.Id);

        if (equipe2 == null)
        {
          equipe2 = new SubEquipe(equipe.Id);
          Equipes.Add(equipe2);
        }

        equipe2.Update(equipe);
      }

      Equipes = Equipes.OrderBy(o => o.TotalMiliseconds).ToList();
    }

    public class SubProva
    {
      public Guid Id { get; set; }
      public List<SubEquipe> Equipes { get; set; } = new List<SubEquipe>();

      public SubProva(Guid id)
      {
        Id = id;
      }

      public void Update(SubProva prova)
      {
        foreach (var equipe in prova.Equipes)
        {
          var equipe2 = Equipes.SingleOrDefault(w => w.Id == equipe.Id);

          if (equipe2 == null)
          {
            equipe2 = new SubEquipe(equipe.Id);
            Equipes.Add(equipe);
          }

          equipe2.Update(equipe);
        }
      }
    }

    public class SubEquipe
    {
      public Guid Id { get; set; }
      public int PenalidadeSeconds { get; set; }
      public int TimeMiliseconds { get; set; }

      public int TotalMiliseconds { get; set; }

      public SubEquipe(Guid id)
      {
        Id = id;
      }

      public void Update(SubEquipe equipe)
      {
        PenalidadeSeconds = equipe.PenalidadeSeconds;
        TimeMiliseconds = equipe.TimeMiliseconds;
        CalcTotal();
      }

      private void CalcTotal()
      {
        TotalMiliseconds = PenalidadeSeconds * 1000;
        TotalMiliseconds += TimeMiliseconds;
      }
    }
  }
}