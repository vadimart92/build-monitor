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
}