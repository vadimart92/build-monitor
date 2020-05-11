using System.Collections.Generic;
using BuildMonitor.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuildMonitor.Controllers
{
    
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
