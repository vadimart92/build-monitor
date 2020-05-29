namespace BuildMonitor.Actors
{
	class ReloadProfile
	{
		public ReloadProfile(string profileName) {
			ProfileName = profileName;
		}

		public string ProfileName { get; }
	}

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
