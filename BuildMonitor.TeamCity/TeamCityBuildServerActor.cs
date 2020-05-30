using System;
using System.Collections.Generic;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Common.Actors;
using BuildMonitor.Contracts.Actors;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.TeamCity
{
	public class TeamCityBuildServerActor : BaseBuildServerActor
	{
		private readonly TeamcityBuildServerConfig _buildServerConfig;
		private readonly List<string> _buildConfigurationId = new List<string>();

		public TeamCityBuildServerActor(TeamcityBuildServerConfig buildServerConfig) {
			_buildServerConfig = buildServerConfig;
			Receive<List<BuildList>>(msg => {
				var buildActors = msg.Select(m => m.GetTypedConfig<TeamCityBuildListConfig>())
					.SelectMany(GetBuildActors).ToList();
				Sender.Tell(buildActors);
				ScheduleNextCheck();
			});
			Receive<ReleaseBuilds>(ReleaseBuilds);
			Receive<Refresh>(ExecuteCheck);
		}

		protected override SupervisorStrategy SupervisorStrategy() {
			return new OneForOneStrategy(exception => Directive.Stop);
		}

		private int _currentBuild = -1;
		protected virtual void ExecuteCheck(Refresh refresh) {
			ScheduleNextCheck();
			_currentBuild = ++_currentBuild % _buildConfigurationId.Count;
			var buildId = _buildConfigurationId[_currentBuild];
			GetBuildActor(buildId).Tell(Refresh.Instance);
		}

		private void ScheduleNextCheck() {
			var totalInterval = _buildServerConfig.CheckIntervalSeconds * 1000d;
			var allChildrenCount = Context.GetChildren().Count();
			if (allChildrenCount <= 0) return;
			var interval = TimeSpan.FromMilliseconds(totalInterval / allChildrenCount);
			Context.System.Scheduler.ScheduleTellOnce(interval, Self, Refresh.Instance, Self);
		}

		private IEnumerable<IActorRef> GetBuildActors(TeamCityBuildListConfig buildList) {
			return buildList.BuildIds.Select(GetBuildActor);
		}

		private IActorRef GetBuildActor(string buildId) {
			buildId = buildId.ToLowerInvariant();
			var actor = Context.Child(buildId);
			if (!actor.IsNobody()) return actor;
			_buildConfigurationId.Add(buildId);
			actor = Context.ActorOf(Props.Create(() => new TeamCityBuildActor(_buildServerConfig, buildId)),
				buildId);
			return actor;
		}
	}
}
