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
        public string Description { get; set; }
        public string Config { get; set; }
    }
    
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Profile> Get()
        {
            return new Profile[] {
                new Profile(), 
            };
        }
    }
}
