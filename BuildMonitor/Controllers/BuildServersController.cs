using BuildMonitor.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuildMonitor.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class BuildServersController : SimpleCrudController<BuildServer>
	{

		public BuildServersController(ConfigDbContext dbContext)
			: base(dbContext) {
		}

	}
}