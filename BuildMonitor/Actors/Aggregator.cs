using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using Akka.Actor;

namespace BuildMonitor.Actors
{
	class Aggregator<T, TMetadata> : ReceiveActor
	{
		private IActorRef _originalSender;
		private readonly IList<IActorRef> _refActors;
		private readonly TMetadata _metadata;

		public Aggregator(IList<IActorRef> refActors, TMetadata metadata) {
			_refActors = refActors;
			_metadata = metadata;
			Context.SetReceiveTimeout(TimeSpan.FromSeconds(30));
			ReceiveAny(x => {
				_originalSender = Sender;
				foreach (var actorRef in refActors) actorRef.Tell(x);
				Become(Aggregating);
			});
		}

		private void Aggregating() {
			var replies = new Dictionary<IActorRef, T>();
			Receive<ReceiveTimeout>(_ => ReplyAndStop(replies));
			Receive<T>(x => {
				if (_refActors.Remove(Sender)) replies.Add(Sender, x);
				if (_refActors.Count == 0) ReplyAndStop(replies);
			});
		}

		private void ReplyAndStop(Dictionary<IActorRef, T> replies) {
			_originalSender.Tell(new AggregatorResponse<T,TMetadata>(_metadata, replies));
			Context.Stop(Self);
		}
	}
}
