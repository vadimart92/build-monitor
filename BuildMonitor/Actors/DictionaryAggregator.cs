using System.Collections.Generic;
using System.Linq;
using Akka.Actor;

namespace BuildMonitor.Actors
{
	class DictionaryAggregator<TResponse, TMetadata, TRequest> : BaseAggregator<TResponse, TMetadata>
	{

		public DictionaryAggregator(IDictionary<IActorRef, TRequest> refActors, TMetadata metadata) : base(refActors.Keys.ToList(), metadata) {
			OriginalSender = Context.Parent;
			foreach (var actorRef in refActors) actorRef.Key.Tell(actorRef.Value);
			Become(Aggregating);
		}

	}
}
