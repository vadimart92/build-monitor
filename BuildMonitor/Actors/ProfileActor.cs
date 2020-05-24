using System;
using Akka.Actor;
using Akka.DI.Core;
using BuildMonitor.Models;

namespace BuildMonitor.Actors
{
	public class ProfileActor : ReceiveActor
	{
		public class SendProfile
		{
			public SendProfile(string connectionId) {
				ConnectionId = connectionId;
			}

			public string ConnectionId { get; }
		}
		public ProfileActor(IServiceProvider serviceProvider, string profileName, IActorRef profileNotifier) {
			Receive<SendProfile>(msg => {
				var profileData = new ProfileData() {
					Name = profileName
				};
				profileNotifier.Tell(new NotifyClient(msg.ConnectionId, profileData));
			});
		}
	}
}
