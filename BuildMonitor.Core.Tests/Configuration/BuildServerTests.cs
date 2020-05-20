using System.Text.Json;
using BuildMonitor.Core.Configuration;
using FluentAssertions;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace BuildMonitor.Core.Tests.Configuration
{
	[TestFixture]
	public class BuildServerTests
	{
		[Test]
		public void DeserializeAndSerialize() {
			var source = "{\n    \"type\": \"teamCity\",\n    \"name\": \"teamcityPublic\",\n    \"url\": \"https://teamcity.jetbrains.com\",\n    \"guestLogin\": true\n  }";
			var options = new JsonSerializerOptions() {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
				IgnoreNullValues = true
			};
			var result = JsonSerializer.Deserialize<BuildServerConfig>(source, options);
			var buildServer = result.Should().BeOfType<TeamcityBuildServer>().Subject;
			buildServer.Type.Should().Be(BuildServerType.TeamCity);
			buildServer.Name.Should().Be("teamcityPublic");
			buildServer.Url.Should().Be("https://teamcity.jetbrains.com");
			buildServer.GuestLogin.Should().BeTrue();
			var serialized = JsonSerializer.Serialize(result, options);
			JToken.DeepEquals(JObject.Parse(source), JObject.Parse(serialized)).Should().BeTrue();
		}
	}
}