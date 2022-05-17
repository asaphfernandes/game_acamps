using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Middlewares
{
  public static class ControllerMiddleware
  {
    public static IServiceCollection AddCustomMVC(this IServiceCollection services)
    {
      services
          .AddControllers(options => options.Filters.Add(typeof(HttpGlobalExceptionFilter)))
          .AddJsonOptions(options =>
          {
            options.JsonSerializerOptions.WriteIndented = false;
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
          });

      services.AddResponseCompression(options =>
      {
        options.Providers.Add<GzipCompressionProvider>();
      });

      services
          .AddAuthorization(options =>
          {
            options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
          });

      services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy",
                  builder => builder
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .SetIsOriginAllowed((host) => true)
                      .AllowCredentials());
      });

      return services;
    }
  }
}
