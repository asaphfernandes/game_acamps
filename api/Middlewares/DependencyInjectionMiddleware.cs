using Microsoft.Extensions.DependencyInjection;

namespace Api.Middlewares
{
  public static class DependencyInjectionMiddleware
  {
    public static IServiceCollection AddContainer(this IServiceCollection services)
    {
      #region Base

      #endregion

      #region Controller

      services.AddScoped<Controllers.Equipes.Create.Service>();
      services.AddScoped<Controllers.Equipes.Delete.Service>();
      services.AddScoped<Controllers.Provas.Create.Service>();
      services.AddScoped<Controllers.Provas.Delete.Service>();
      services.AddScoped<Controllers.Resultados.Zerar.Service>();
      services.AddScoped<Controllers.Resultados.Transmitir.Service>();
      services.AddScoped<Controllers.Resultados.Manutencao.Service>();

      #endregion

      return services;
    }
  }
}
