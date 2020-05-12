using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	public class Profile
	{
		public IList<Screen> Screens { get; set; }
	}

	[JsonConverter(typeof(AbstractTypeConverter<Screen,ScreenType>))]
	public abstract class Screen
	{
		public abstract ScreenType Type { get; }
		public int DisplayTime { get; set; }
	}

	public class BuildStatusScreen : Screen
	{
		public override ScreenType Type => ScreenType.BuildStatus;
		public IList<BuildList> Builds { get; set; }
	}

	public class BuildList
	{
		public string BuildServer { get; set; }
		
		[JsonConverter(typeof(JsonDocumentConverter))]
		public JsonDocument Config { get; set; }

	}

	public abstract class BuildListConfig
	{
	}

	public class TeamCityBuildListConfig : BuildListConfig
	{
		
	}

	public enum ScreenType
	{
		[MapType(typeof(BuildStatusScreen))]
		BuildStatus
	}
}