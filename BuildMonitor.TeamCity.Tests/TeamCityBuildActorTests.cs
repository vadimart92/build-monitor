using NUnit.Framework;
using Akka.TestKit.NUnit;

namespace BuildMonitor.TeamCity.Tests
{
	using System;
	using System.Net;
	using Akka.Actor;
	using BuildMonitor.Contracts.Actors;
	using BuildMonitor.Contracts.Configuration;
	using FluentAssertions;

	public class TeamCityBuildActorTests : TestKit
	{
		[Test]
		public void Ctor_ShouldSendBuildInfoMessage() {
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13;
			var serverConfig = new TeamcityBuildServerConfig() {
				GuestLogin = true,
				Url = @"https://localhost"
			};
			var actor = Sys.ActorOf(Props.Create(() => new TeamCityBuildActor(serverConfig,
				"ContinuousIntegration_UnitTest_780_PreCommitUnitTest", TestActor)));
			var result = ExpectMsg<BuildInfoMessage>(TimeSpan.FromHours(1));
			result.ViewType.Should().Be(BuildViewType.TeamCity);
		}
	}
}
