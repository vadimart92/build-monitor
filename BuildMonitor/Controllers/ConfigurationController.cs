using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
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
        public  IAsyncEnumerable<Profile> GetProfiles() {
            return _dbContext.Profiles.AsAsyncEnumerable();
        }
        
        [HttpGet("getBuildServers")]
        public IAsyncEnumerable<BuildServer> GetBuildServers() {
            return _dbContext.BuildServers.AsAsyncEnumerable();
        }
        
        [HttpGet("getBuildServer/{buildServerId}")]
        public ValueTask<BuildServer> GetBuildServers(Guid buildServerId) {
            return _dbContext.BuildServers.FindAsync(buildServerId);
        }
        
        [HttpGet("getProfile/{profileId}")]
        public ValueTask<Profile> GetProfile(Guid profileId) {
            return _dbContext.Profiles.FindAsync(profileId);
        }

        [HttpDelete("removeBuildServer/{buildServerId}")]
        public async Task<IActionResult> RemoveBuildServer(Guid buildServerId) {
            var server = await _dbContext.BuildServers.FindAsync(buildServerId);
            if (server == null) return Ok();
            _dbContext.BuildServers.Remove(server);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        
        [HttpDelete("removeProfile/{profileId}")]
        public async Task<IActionResult> RemoveProfile(Guid profileId) {
            var profile = await _dbContext.Profiles.FindAsync(profileId);
            if (profile == null) return Ok();
            _dbContext.Profiles.Remove(profile);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("saveProfile")]
        public async Task<IActionResult> Save([FromBody]Profile profile) {
            var current = await _dbContext.Profiles.FindAsync(profile.Id);
            if (current != null) {
                _dbContext.Profiles.Remove(current);
            }
            await _dbContext.Profiles.AddAsync(profile);
            await _dbContext.SaveChangesAsync();
            return Ok();
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
