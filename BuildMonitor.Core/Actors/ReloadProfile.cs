namespace BuildMonitor.Core.Actors
{
	public class ReloadProfile
	{
		public ReloadProfile(string profileName) {
			ProfileName = profileName;
		}

		public string ProfileName { get; }
	}
}