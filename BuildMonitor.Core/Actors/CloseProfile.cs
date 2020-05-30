namespace BuildMonitor.Core.Actors
{
	public class CloseProfile
	{
		public CloseProfile(string connectionId) {
			ConnectionId = connectionId;
		}

		public string ConnectionId { get; }
	}
}
