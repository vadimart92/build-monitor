using BuildMonitor.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuildMonitor.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProfilesController : SimpleCrudController<Profile>
	{

		public ProfilesController(ConfigDbContext dbContext)
			: base(dbContext) {
		}

	}
}
