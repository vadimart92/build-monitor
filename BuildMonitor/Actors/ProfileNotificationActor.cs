using Akka.Actor;
using Microsoft.AspNetCore.SignalR;

namespace BuildMonitor.Actors
{
	class ProfileData
	{
		public string Name { get; set; }
	}

	class NotifyClient
	{
		public NotifyClient(string connectionId, ProfileData data) {
			ConnectionId = connectionId;
			Data = data;
		}

		public ProfileData Data { get; }
		public string ConnectionId { get; }
	}
	public class ProfileNotificationActor : ReceiveActor
	{
		public ProfileNotificationActor(IHubContext<ProfileHub> hubContext) {
			Receive<NotifyClient>(async msg => {
				await hubContext.Clients.Client(msg.ConnectionId).SendAsync("profileDataReady", msg.Data);
			});
		}
	}
}
