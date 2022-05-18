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

      services.AddScoped<Controllers.Provas.Create.Service>();
      services.AddScoped<Controllers.Provas.Delete.Service>();

      #endregion

      return services;
    }
  }
}
