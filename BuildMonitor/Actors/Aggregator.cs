using System.Collections.Generic;
using Akka.Actor;

namespace BuildMonitor.Actors
{
	class Aggregator<T, TMetadata> : BaseAggregator<T, TMetadata>
	{

		public Aggregator(IEnumerable<IActorRef> refActors, TMetadata metadata) : base(refActors, metadata) {
			ReceiveAny(x => {
				OriginalSender = Sender;
				foreach (var actorRef in refActors) actorRef.Tell(x);
				Become(Aggregating);
			});
		}

	}
}
