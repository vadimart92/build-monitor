using System;
using System.Collections.Generic;
using System.Linq;
using Akka.Actor;

namespace BuildMonitor.Core.Actors
{
	class BaseAggregator<TSingleResponse, TMetadata> : ReceiveActor
	{

		private readonly IList<IActorRef> _refActors;
		private readonly TMetadata _metadata;

		protected IActorRef OriginalSender { get; set; }

		protected BaseAggregator(IEnumerable<IActorRef> refActors, TMetadata metadata) {
			_refActors = refActors.ToList();
			_metadata = metadata;
			Context.SetReceiveTimeout(TimeSpan.FromSeconds(30));
		}

		protected void Aggregating() {
			var replies = new Dictionary<IActorRef, TSingleResponse>();
			Receive<ReceiveTimeout>(_ => ReplyAndStop(replies));
			Receive<TSingleResponse>(x => {
				if (_refActors.Remove(Sender)) replies.Add(Sender, x);
				if (_refActors.Count == 0) ReplyAndStop(replies);
			});
		}

		private void ReplyAndStop(Dictionary<IActorRef, TSingleResponse> replies) {
			OriginalSender.Tell(new AggregatorResponse<TSingleResponse,TMetadata>(_metadata, replies));
			Context.Stop(Self);
		}

	}
}
