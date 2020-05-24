using System;
using System.Collections.Generic;
using System.Linq;
using Akka.Actor;
using Akka.DI.Core;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BuildMonitor.Actors
{
	class OpenProfile
	{
		public string ConnectionId { get; }
		public string ProfileName { get; }

		public OpenProfile(string connectionId, string profileName) {
			ConnectionId = connectionId;
			ProfileName = profileName;
		}
	}

	class CloseProfile
	{
		public CloseProfile(string connectionId) {
			ConnectionId = connectionId;
		}

		public string ConnectionId { get; }
	}
	public class ProfileServiceActor : ReceiveActor
	{
		class TryStopProfile
		{
			public TryStopProfile(string profileName) {
				ProfileName = profileName;
			}

			public string ProfileName { get; }
		}

		public Dictionary<string, string> ProfileListeners { get; } = new Dictionary<string, string>(
			StringComparer.OrdinalIgnoreCase);

		public ProfileServiceActor(IServiceProvider serviceProvider, IActors actors) {
			Receive<OpenProfile>(msg => {
				var actor = Context.Child(msg.ProfileName);
				if (actor.IsNobody()) {
					actor = Context.ActorOf(Props.Create<ProfileActor>(serviceProvider, msg.ProfileName,
						actors.ProfileNotifier));
				}
				ProfileListeners[msg.ConnectionId] = msg.ProfileName;
				actor.Tell(new ProfileActor.SendProfile(msg.ConnectionId));
			});
			Receive<TryStopProfile>(msg => {
				var profileName = msg.ProfileName;
				if (!ProfileListeners.Values.Any(v => profileName.Equals(v, StringComparison.OrdinalIgnoreCase))) {
					var actor = Context.Child(profileName);
					Context.Stop(actor);
				}
			});
			Receive<CloseProfile>(msg => {
				if (!ProfileListeners.TryGetValue(msg.ConnectionId, out var profileName)) return;
				ProfileListeners.Remove(msg.ConnectionId);
				Context.System.Scheduler.ScheduleTellOnce(TimeSpan.FromMinutes(2), Self,
					new TryStopProfile(profileName), Self);
			});
		}
	}
}
