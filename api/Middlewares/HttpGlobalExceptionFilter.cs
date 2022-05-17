using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api.Middlewares
{
  public class HttpGlobalExceptionFilter : IAsyncExceptionFilter
  {
    public HttpGlobalExceptionFilter(IWebHostEnvironment env, ILogger<HttpGlobalExceptionFilter> logger)
    {
      _env = env;
      _logger = logger;
    }

    private readonly IWebHostEnvironment _env;
    private readonly ILogger<HttpGlobalExceptionFilter> _logger;

    public async Task OnExceptionAsync(ExceptionContext context)
    {
      await Task.Run(() =>
      {
        _logger.LogError(new EventId(context.Exception.HResult),
                          context.Exception,
                          context.Exception.Message);

        var json = new JsonErrorResponse { Message = "Ocorreu um erro. Se o problema persistir, contacte o suporte." };

        if (_env.IsDevelopment())
          json.DeveloperMessage = context.Exception.ToString();

        context.Result = new JsonResult(json);
        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.ExceptionHandled = true;
      });
    }

    private class JsonErrorResponse
    {
      public string Message { get; set; }

      public object DeveloperMessage { get; set; }
    }
  }
}
