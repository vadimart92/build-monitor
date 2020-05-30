using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Contracts.Actors;
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
			Receive<ReleaseBuilds>(msg => {
				var children = Context.GetChildren().ToList();
				var childrenToStop = msg.BuildActors.Intersect(children);
				foreach (var actor in childrenToStop) {
					Context.Stop(actor);
				}
				if (!children.Except(msg.BuildActors).Any()) {
					Context.Stop(Self);
				}
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
