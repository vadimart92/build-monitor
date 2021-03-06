﻿using System.Text.Json.Serialization;

namespace BuildMonitor.Contracts.Configuration
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
		[MapType(typeof(TeamcityBuildServerConfig))]
		TeamCity,
		Jenkins
	}

	public class TeamcityBuildServerConfig : BuildServerConfig
	{
		public string Url { get; set; }
		public bool GuestLogin { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }

		public string AccessToken { get; set; }
		public int CheckIntervalSeconds { get; set; }

		[JsonConverter(typeof(StringEnumConverter<BuildServerType>))]
		public override BuildServerType Type => BuildServerType.TeamCity;
	}
}
