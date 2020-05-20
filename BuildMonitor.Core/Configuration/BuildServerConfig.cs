using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	[JsonConverter(typeof(AbstractTypeConverter<BuildServerConfig,BuildServerType>))]
	public abstract class BuildServerConfig
	{
		[JsonConverter(typeof(StringEnumConverter<BuildServerType>))]
		public abstract BuildServerType Type { get; }
		public string Name { get; set; }
	}

	public enum BuildServerType
	{
		[MapType(typeof(TeamcityBuildServer))]
		TeamCity,
		Jenkins
	}

	public class TeamcityBuildServer : BuildServerConfig
	{
		public string Url { get; set; }
		public bool GuestLogin { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		
		[JsonConverter(typeof(StringEnumConverter<BuildServerType>))]
		public override BuildServerType Type => BuildServerType.TeamCity;
	}
}