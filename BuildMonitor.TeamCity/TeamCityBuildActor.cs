using System;
using Akka.Actor;
using BuildMonitor.Common.Actors;
using BuildMonitor.Contracts.Actors;
using BuildMonitor.Contracts.Configuration;
using TeamCitySharp;

namespace BuildMonitor.TeamCity
{
	class TeamCityBuildActor : ReceiveActor
	{
		private readonly TeamcityBuildServerConfig _buildServerConfig;
		private readonly string _buildTypeId;
		private readonly IActorRef _notifier;

		private readonly TeamCityBuildInfo _currentBuildInfo;
		public TeamCityBuildActor(TeamcityBuildServerConfig buildServerConfig, string buildTypeId) {
			var buildInfoId = $"{buildServerConfig.Name}_{buildTypeId}_{Guid.NewGuid()}";
			_currentBuildInfo = TeamCityBuildInfo.Empty(buildInfoId);
			_buildServerConfig = buildServerConfig;
			_buildTypeId = buildTypeId;
			Receive<GetBuildInfoMessage>(msg => SendBuildInfoMessage(Sender));
			Receive<Refresh>(RefreshInfo);
			Self.Tell(Refresh.Instance);
			_notifier = Context.GetActors().ProfileNotifier;
		}

		private void RefreshInfo(Refresh msg) {
			var info = _currentBuildInfo;
			var client = Connect();
			var lastBuild = client.Builds.LastBuildByBuildConfigId(_buildTypeId);
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
			SendBuildInfoMessage(_notifier);
		}

		private TeamCityClient Connect() {
			var url = new Uri(_buildServerConfig.Url);
			var host = $"{url.Host}:{url.Port}";
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

		private void SendBuildInfoMessage(IActorRef target) {
			target.Tell(new BuildInfoMessage {
				ViewType = BuildViewType.TeamCity,
				Config = _currentBuildInfo
			});
		}
	}
}
