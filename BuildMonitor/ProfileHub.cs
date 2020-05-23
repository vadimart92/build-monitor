using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace BuildMonitor
{
	public class ProfileHub : Hub
	{
		[HubMethodName("subscribe")]
		public async Task Subscribe(string profileId) {
			await Groups.AddToGroupAsync(Context.ConnectionId, profileId);
		}

		[HubMethodName("unsubscribe")]
		public async Task Unsubscribe(string profileId) {
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, profileId);
		}
	}
}
