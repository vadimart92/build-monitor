using System.Text.Json;
using BuildMonitor.Core.Configuration;
using FluentAssertions;
using NUnit.Framework;

namespace BuildMonitor.Core.Tests.Configuration
{
	[TestFixture]
	public class BuildServerTests
	{
		[Test]
		public void Deserialize() {
			var source = "{\n    \"type\": \"teamCity\",\n    \"name\": \"teamcityPublic\",\n    \"url\": \"https://teamcity.jetbrains.com\",\n    \"guestLogin\": true\n  }";
			var result = System.Text.Json.JsonSerializer.Deserialize<BuildServer>(source, new JsonSerializerOptions() {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			});
			var buildServer = result.Should().BeOfType<TeamcityBuildServer>().Subject;
			buildServer.Type.Should().Be(BuildServerType.TeamCity);
			buildServer.Name.Should().Be("teamcityPublic");
			buildServer.Url.Should().Be("https://teamcity.jetbrains.com");
			buildServer.GuestLogin.Should().BeTrue();
		}
	}
}