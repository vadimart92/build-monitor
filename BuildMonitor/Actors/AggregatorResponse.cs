using System.Collections.Generic;
using System.Collections.Immutable;
using Akka.Actor;

namespace BuildMonitor.Actors
{
	class AggregatorResponse<TResponse, TMetadata>
	{
		public AggregatorResponse(TMetadata metadata, Dictionary<IActorRef, TResponse> results) {
			Metadata = metadata;
			Results = results.ToImmutableDictionary();
		}

		public IImmutableDictionary<IActorRef, TResponse> Results { get; }
		public TMetadata Metadata { get;  }
	}
}
