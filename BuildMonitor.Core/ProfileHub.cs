using System;
using System.Threading.Tasks;
using Akka.Actor;
using BuildMonitor.Core.Actors;
using Microsoft.AspNetCore.SignalR;

namespace BuildMonitor.Core
{
	public class ProfileHub : Hub
	{
		private readonly IActors _actors;

		public ProfileHub(IActors actors) {
			_actors = actors;
		}

		[HubMethodName("subscribe")]
		public async Task Subscribe(string profileName) {
			await Groups.AddToGroupAsync(Context.ConnectionId, profileName);
			_actors.ProfileService.Tell(new OpenProfile(Context.ConnectionId, profileName));
		}

		[HubMethodName("unsubscribe")]
		public async Task Unsubscribe(string profileId) {
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, profileId);
			_actors.ProfileService.Tell(new CloseProfile(Context.ConnectionId));
		}

		public override Task OnDisconnectedAsync(Exception exception) {
			_actors.ProfileService.Tell(new CloseProfile(Context.ConnectionId));
			return base.OnDisconnectedAsync(exception);
		}
	}
}
