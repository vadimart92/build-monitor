using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	public class ProfileConfig
	{
		public IList<Screen> Screens { get; set; }

	}

	[JsonConverter(typeof(AbstractTypeConverter<Screen,ScreenType>))]
	public abstract class Screen
	{
		[JsonConverter(typeof(StringEnumConverter<ScreenType>))]
		public abstract ScreenType Type { get; }
		public int DisplayTime { get; set; }
	}

	public class BuildStatusScreen : Screen
	{
		[JsonConverter(typeof(StringEnumConverter<ScreenType>))]
		public override ScreenType Type => ScreenType.BuildStatus;
		public IList<BuildList> Builds { get; set; }
	}

	public class BuildList
	{
		public string BuildServer { get; set; }
		
		[JsonConverter(typeof(JsonDocumentConverter))]
		public JsonDocument Config { get; set; }

		public T GetTypedConfig<T>() {
			return JsonSerializer.Deserialize<T>(Config.RootElement.GetRawText(), new JsonSerializerOptions {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			});
		}
	}

	public abstract class BuildListConfig
	{
	}

	public class TeamCityBuildListConfig : BuildListConfig
	{
		public IList<string> BuildIds { get; set; }
	}

	public enum ScreenType
	{
		[MapType(typeof(BuildStatusScreen))]
		BuildStatus
	}
}