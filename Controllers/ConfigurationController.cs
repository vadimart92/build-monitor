using System;
using System.Linq;
using System.Threading.Tasks;
using BuildMonitor.Models;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace BuildMonitor.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigurationController : ControllerBase
    {

        private readonly ConfigDbContext _dbContext;

        public ConfigurationController(ConfigDbContext dbContext) {
            _dbContext = dbContext;
        }

        [HttpGet("getProfiles")]
        public IQueryable<Profile> GetProfiles() {
            return _dbContext.Profiles.AsQueryable();
        }
        
        [HttpGet("getBuildServers")]
        public IQueryable<BuildServer> GetBuildServers() {
            return _dbContext.BuildServers.AsQueryable();
        }

        [HttpPost("saveProfile")]
        public IActionResult Save([FromBody]Profile profile) {
            throw new NotImplementedException();
        }
        [HttpPost("saveBuildServer")]
        public async Task<IActionResult> Save([FromBody]BuildServer buildServer) {
            var current = await _dbContext.BuildServers.FindAsync(buildServer.Id);
            if (current != null) {
                _dbContext.BuildServers.Remove(current);
            }
            await _dbContext.BuildServers.AddAsync(buildServer);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
