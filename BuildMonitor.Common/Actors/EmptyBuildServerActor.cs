using System.Collections.Generic;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.Common.Actors
{
	public class EmptyBuildServerActor : BaseBuildServerActor
	{
		public EmptyBuildServerActor(string buildName) {
			Receive<List<BuildList>>(msg => {
				Sender.Tell(msg.Select(bl =>
					Context.ActorOf(Props.Create<EmptyBuildActor>($"build server {buildName} not found"))));
			});
		}
	}
}
