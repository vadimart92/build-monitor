using Akka.Actor;
using BuildMonitor.Common.Actors;
using BuildMonitor.Contracts.Models;
using BuildMonitor.Core;
using BuildMonitor.Core.Actors;
using Microsoft.AspNetCore.Mvc;

namespace BuildMonitor.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProfilesController : SimpleCrudController<Profile>
	{

		private readonly IActors _actors;

		public ProfilesController(ConfigDbContext dbContext, IActors actors)
			: base(dbContext) {
			_actors = actors;
		}

		protected override void OnSave(Profile item) {
			_actors.ProfileService.Tell(new ReloadProfile(item.Name));
		}
	}
}
