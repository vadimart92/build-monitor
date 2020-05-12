using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	[JsonConverter(typeof(BuildServerConverter))]
	[MapType(typeof(TeamcityBuildServer), typeof(BuildServerType), (int)BuildServerType.TeamCity)]
	public abstract class BuildServer
	{
		public abstract BuildServerType Type { get; }
		public string Name { get; set; }
	}

	public enum BuildServerType
	{
		TeamCity,
		Jenkins
	}

	public class TeamcityBuildServer : BuildServer
	{
		public string Url { get; set; }
		public bool GuestLogin { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public override BuildServerType Type => BuildServerType.TeamCity;
	}
}