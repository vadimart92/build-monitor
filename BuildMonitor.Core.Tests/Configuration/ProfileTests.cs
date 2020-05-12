using System.Linq;
using System.Text.Json;
using BuildMonitor.Core.Configuration;
using FluentAssertions;
using NUnit.Framework;

namespace BuildMonitor.Core.Tests.Configuration
{
	[TestFixture]
	public class ProfileTests
	{
		[Test]
		public void Deserialize() {
			var source =
				"{\n    \"screens\": [\n      {\n        \"type\": \"buildStatus\",\n        \"displayTime\": 60,\n        \"builds\": [\n          {\n            \"buildServer\": \"testServer\",\n            \"config\": {\n              \"buildIds\": [\"coreUnitTest\"]\n            }\n          }\n        ]\n      }\n    ]\n  }";
			var result = JsonSerializer.Deserialize<Profile>(source, new JsonSerializerOptions() {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			});
			var screen = result.Screens.Should().HaveCount(1).And.Subject.First();
			var buildScreen = screen.Should().BeOfType<BuildStatusScreen>().Subject;
			buildScreen.DisplayTime.Should().Be(60);
			var build = buildScreen.Builds.Should().HaveCount(1).And.Subject.First();
			build.BuildServer.Should().Be("testServer");
			build.Config.Should().NotBeNull();
			//TODO get TeamCityBuildListConfig
			//var buildListConfig = build.GetTypedConfig<TeamCityBuildListConfig>();
		}
	}
}