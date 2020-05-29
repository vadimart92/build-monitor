using System.Linq;
using System.Text.Json;
using BuildMonitor.Core.Configuration;
using FluentAssertions;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace BuildMonitor.Core.Tests.Configuration
{
	[TestFixture]
	public class ProfileTests
	{
		[Test]
		public void DeserializeAndSerialize() {
			var source =
				"{\n    \"screens\": [\n      {\n        \"type\": \"buildStatus\",\n        \"displayTime\": 60,\n        \"builds\": [\n          {\n            \"buildServer\": \"testServer\",\n            \"config\": {\n              \"buildIds\": [\"coreUnitTest\"]\n            }\n          }\n        ]\n      }\n    ]\n  }";
			var options = new JsonSerializerOptions() {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			};
			var result = JsonSerializer.Deserialize<ProfileConfig>(source, options);
			var screen = result.Screens.Should().HaveCount(1).And.Subject.First();
			var buildScreen = screen.Should().BeOfType<BuildStatusScreen>().Subject;
			buildScreen.DisplayTime.Should().Be(60);
			var build = buildScreen.Builds.Should().HaveCount(1).And.Subject.First();
			build.BuildServer.Should().Be("testServer");
			build.Config.Should().NotBeNull();
			var buildListConfig = build.GetTypedConfig<TeamCityBuildListConfig>();
			buildListConfig.Should().NotBeNull();
			buildListConfig.BuildIds.Should().Contain("coreUnitTest");
			var serialized = JsonSerializer.Serialize(result, options);
			JToken.DeepEquals(JObject.Parse(source), JObject.Parse(serialized)).Should().BeTrue();
		}
	}
}