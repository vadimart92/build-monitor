using System.Collections.Generic;
using Akka.Actor;
using BuildMonitor.Core.Configuration;

namespace BuildMonitor.Actors
{
	class TeamCityBuildServerActor : ReceiveActor
	{
		public TeamCityBuildServerActor() {
			var actor = Context.ActorOf(Props.Create(() => new TeamCityBuildActor()));
			Receive<List<BuildList>>(msg => {
				Sender.Tell(new List<IActorRef> {actor});
			});
		}
	}
}
