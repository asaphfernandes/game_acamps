using Api.Contexts;
using Api.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
      Configuration = configuration;
      Env = env;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Env { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services
        .ConfiguraMongoDb()
        .AddCustomMVC()
        .AddContainer()
        .AddMongoDbContext<DbGameContext>(Configuration);
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseRouting();

      if (Env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }
      app.UseCors(c =>
      {
        c.AllowAnyHeader();
        c.AllowAnyMethod();
        c.AllowAnyOrigin();
      });

      app
          .UseHttpsRedirection()
          .UseAuthentication()
          .UseAuthorization();

      app.UseResponseCompression();

      app.UseEndpoints(end =>
      {
        end.MapDefaultControllerRoute();
      });
    }
  }
}
