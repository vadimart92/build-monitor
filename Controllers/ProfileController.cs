using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace build_monitor.Controllers
{

    public class Profile
    {
        public string Name { get; set; }
        public string Config { get; set; }
    }
    
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ProfileController> _logger;

        public ProfileController(ILogger<ProfileController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Profile> Get()
        {
            return new Profile[] {
                new Profile(), 
            };
        }
    }
}
