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
		public TeamCityBuildServerActor(TeamcityBuildServerConfig buildServerConfig) {
			Receive<List<BuildList>>(msg => {
				var buildActors = msg.Select(m => m.GetTypedConfig<TeamCityBuildListConfig>())
					.SelectMany(b => b.BuildIds)
					.Select(GetBuildActor).ToList();
				Sender.Tell(buildActors);
			});
			Receive<ReleaseBuilds>(ReleaseBuilds);
		}

		private IActorRef GetBuildActor(string buildId) {
			var actor = Context.Child(buildId);
			if (actor.IsNobody()) {
				actor = Context.ActorOf(Props.Create(() => new TeamCityBuildActor(buildId)), buildId);
			}
			return actor;
		}
	}
}
