using System.Collections.Generic;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.TeamCity
{
	public class TeamCityBuildServerActor : ReceiveActor
	{
		public TeamCityBuildServerActor(TeamcityBuildServerConfig buildServerConfig) {
			Receive<List<BuildList>>(msg => {
				var buildActors = msg.Select(m => m.GetTypedConfig<TeamCityBuildListConfig>())
					.SelectMany(b => b.BuildIds)
					.Select(GetBuildActor).ToList();
				Sender.Tell(buildActors);
			});
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
