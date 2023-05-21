using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        //"1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private static readonly string[] gersummarys = new[]
    {
        //"1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
        "Gefrieren",  "Chilly", "", "Mild", "Warm",  "Heiß", "Schwitzig", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-23, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)],
            gersummary = gersummarys[Random.Shared.Next(gersummarys.Length)]
        })
        .ToArray();
    }
}
