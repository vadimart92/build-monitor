using System;
using Akka.Actor;
using BuildMonitor.Common.Actors;
using BuildMonitor.Contracts.Actors;
using BuildMonitor.Contracts.Configuration;
using TeamCitySharp;

namespace BuildMonitor.TeamCity
{
	using System.Linq;
	using TeamCitySharp.Locators;
	using BuildStatus = BuildMonitor.Contracts.Actors.BuildStatus;

	public class TeamCityBuildActor : ReceiveActor
	{
		private readonly TeamcityBuildServerConfig _buildServerConfig;
		private readonly string _buildTypeId;
		private readonly IActorRef _notifier;

		private readonly TeamCityBuildInfo _currentBuildInfo;
		public TeamCityBuildActor(TeamcityBuildServerConfig buildServerConfig, string buildTypeId, IActorRef notifier) {
			var buildInfoId = $"{buildServerConfig.Name}_{buildTypeId}_{Guid.NewGuid()}";
			_currentBuildInfo = TeamCityBuildInfo.Empty(buildInfoId);
			_buildServerConfig = buildServerConfig;
			_buildTypeId = buildTypeId;
			Receive<GetBuildInfoMessage>(msg => SendBuildInfoMessage());
			Receive<Refresh>(RefreshInfo);
			Self.Tell(Refresh.Instance);
			_notifier = notifier;
		}

		public TeamCityBuildActor(TeamcityBuildServerConfig buildServerConfig, string buildTypeId)
			: this(buildServerConfig, buildTypeId, Context.GetActors().ProfileNotifier) {
		}

		private void RefreshInfo(Refresh msg) {
			var info = _currentBuildInfo;
			var client = Connect();
			var builds = client.Builds.ByBuildLocator(
				BuildLocator.WithDimensions(
					BuildTypeLocator.WithId(_buildTypeId), sinceDate:DateTime.Today.AddDays(-4), branch:"trunk"));

			var lastBuild = builds.Last();
			var build = client.Builds.ById(lastBuild.Id);
			var status = build.Running ? BuildStatus.Running
				: "SUCCESS".Equals(build.Status, StringComparison.OrdinalIgnoreCase)
				? BuildStatus.Success
				: BuildStatus.Failed;
			info.Name = string.IsNullOrWhiteSpace(build.BranchName)
				? build.BuildType.Name
				: $"{build.BuildType.Name}|{build.BranchName}";
			info.Number = build.Number;
			info.Status = status;
			info.Url = build.WebUrl;
			info.CompletedOn = build.FinishDate;
			info.ProjectName = build.BuildType.ProjectName;
			info.StartedBy = build.Triggered.User.Username;
			info.StartedOn = build.StartDate;
			info.StatusText = build.StatusText;
			SendBuildInfoMessage();
		}

		private TeamCityClient Connect() {
			var url = new Uri(_buildServerConfig.Url);
			var host = url.IsDefaultPort ? url.Host : $"{url.Host}:{url.Port}";
			var client = new TeamCityClient(host);
			if (_buildServerConfig.GuestLogin) {
				client.ConnectAsGuest();
			} else if (string.IsNullOrWhiteSpace(_buildServerConfig.AccessToken)){
				client.ConnectWithAccessToken(_buildServerConfig.AccessToken);
			} else {
				client.Connect(_buildServerConfig.Login, _buildServerConfig.Password);
			}
			return client;
		}

		private void SendBuildInfoMessage() {
			_notifier.Tell(new BuildInfoMessage {
				ViewType = BuildViewType.TeamCity,
				Config = _currentBuildInfo
			});
		}
	}
}
