using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Core.Configuration;
using BuildMonitor.Models;
using Microsoft.EntityFrameworkCore;

namespace BuildMonitor.Actors
{

	public class ProfileActor : ReceiveActor, IWithUnboundedStash
	{
		private readonly string _profileName;
		private readonly IActorRef _profileNotifier;
		private Profile _profile;
		private Dictionary<IActorRef, (int, Core.Configuration.Screen)> _screens = new Dictionary<IActorRef, (int, Core.Configuration.Screen)>();

		public class SendProfile
		{
			public SendProfile(string connectionId) {
				ConnectionId = connectionId;
			}

			public string ConnectionId { get; }
		}

		private class Init
		{
			public static Init Instance { get; } = new Init();
		}

		public ProfileActor(string profileName, IActorRef profileNotifier) {
			_profileName = profileName;
			_profileNotifier = profileNotifier;
			Become(Initializing);
			Self.Tell(Init.Instance);
		}

		private void Initializing() {
			Receive<Init>(async msg => {
				await Context.QueryDb(async context => {
					var profile = await context.Profiles.Where(p => p.Name == _profileName).FirstOrDefaultAsync();
					Self.Tell(profile);
				});
			});
			Receive<Profile>(Initialize);
			ReceiveAny(msg => Stash.Stash());
		}

		private void Initialize(Profile msg) {
			_profile = msg;
			for (var index = 0; index < _profile.Config.Screens.Count; index++) {
				var screenConfig = _profile.Config.Screens[index];
				if (screenConfig.Type == ScreenType.BuildStatus) {
					var actor = Context.ActorOf(Props.Create<BuildScreenActor>((BuildStatusScreen)screenConfig));
					_screens.Add(actor, (index, screenConfig));
				}
			}

			Become(Ready);
			Stash.UnstashAll();
		}

		private void Ready() {
			Receive<SendProfile>(CollectProfileData);
			Receive<AggregatorResponse<Screen, string>>(PublishProfileData);
		}

		private void CollectProfileData(SendProfile msg) {
			var actors = _screens.Keys.ToList();
			var aggregator = Context.ActorOf(Props.Create<Aggregator<Screen, string>>(actors, msg.ConnectionId));
			aggregator.Tell(ScreenDataRequest.Instance);
		}

		private void PublishProfileData(AggregatorResponse<Screen, string> response) {
			var sortedScreens = response.Results.OrderBy(kv => _screens[kv.Key].Item1).Select(kv => kv.Value)
				.ToImmutableList();
			var profileData = new ProfileData() {Screens = sortedScreens};
			_profileNotifier.Tell(new NotifyClient(_profileName, response.Metadata, profileData));
		}

		public IStash Stash { get; set; }
	}
}
