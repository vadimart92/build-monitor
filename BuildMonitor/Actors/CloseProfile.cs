namespace BuildMonitor.Actors
{
	class CloseProfile
	{
		public CloseProfile(string connectionId) {
			ConnectionId = connectionId;
		}

		public string ConnectionId { get; }
	}
}