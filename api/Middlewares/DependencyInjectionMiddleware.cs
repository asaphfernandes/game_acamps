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

      services.AddScoped<Controllers.Equipes.Sortear.Service>();
      services.AddScoped<Controllers.Provas.Create.Service>();
      services.AddScoped<Controllers.Provas.Delete.Service>();
      services.AddScoped<Controllers.Resultados.Transmitir.Service>();

      #endregion

      return services;
    }
  }
}
