using System.Collections.Immutable;
using Akka.Actor;

namespace BuildMonitor.Contracts.Actors
{
	public class ReleaseBuilds
	{
		public ReleaseBuilds(IImmutableList<IActorRef> buildActors) {
			BuildActors = buildActors;
		}

		public IImmutableList<IActorRef> BuildActors { get; }
	}
}
