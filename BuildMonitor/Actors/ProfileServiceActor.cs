using System;
using System.Collections.Generic;
using System.Linq;
using Akka.Actor;

namespace BuildMonitor.Actors
{
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

		public ProfileServiceActor(IActors actors) {
			Receive<ReloadProfile>(msg => {
				var actor = Context.Child(msg.ProfileName);
				if (actor.IsNobody()) {
					actor = CreateProfileActor(actors, msg.ProfileName);
				}
				actor.Tell(ProfileActor.Init.Instance);
				actor.Tell(ProfileActor.SendProfile.ToAll);
			});
			Receive<OpenProfile>(msg => {
				var actor = Context.Child(msg.ProfileName);
				if (actor.IsNobody()) {
					actor = CreateProfileActor(actors, msg.ProfileName);
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
				var timeout = TimeSpan.FromMinutes(2);
				Context.System.Scheduler.ScheduleTellOnce(timeout, Self,
					new TryStopProfile(profileName), Self);
			});
		}

		private static IActorRef CreateProfileActor(IActors actors, string profileName) {
			return Context.ActorOf(Props.Create<ProfileActor>(profileName, actors.ProfileNotifier), profileName);
		}
	}
}
