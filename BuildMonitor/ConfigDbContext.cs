using BuildMonitor.Models;
using Microsoft.EntityFrameworkCore;

namespace BuildMonitor
{
	public class ConfigDbContext : DbContext
	{
		public ConfigDbContext(DbContextOptions<ConfigDbContext> options)
			:base(options) {
		}
		public DbSet<Profile> Profiles { get; set; }
		public DbSet<BuildServer> BuildServers { get; set; }
	}
}