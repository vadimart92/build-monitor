using System;
using System.Linq;
using System.Threading.Tasks;
using Akka.Actor;
using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.Common.Actors
{
	public class BaseBuildServerActor : ReceiveActor
	{

		protected void ReleaseBuilds(ReleaseBuilds msg) {
			var children = Context.GetChildren().ToList();
			var childrenToStop = msg.BuildActors.Intersect(children);
			foreach (var actor in childrenToStop) {
				Context.Stop(actor);
			}
			if (!children.Except(msg.BuildActors).Any()) {
				Context.Stop(Self);
			}
		}

	}
}
