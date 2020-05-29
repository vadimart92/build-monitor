using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Akka.Actor;
using BuildMonitor.Core.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace BuildMonitor.Actors
{
	public class BuildScreenActor : ReceiveActor, IWithUnboundedStash
	{
		private BuildStatusScreen _screen;
		private IImmutableList<IActorRef> _buildActors;

		public BuildScreenActor(BuildStatusScreen screen) {
			_screen = screen;
			Receive<IList<IActorRef>>(buildActors => {
				_buildActors = buildActors.ToImmutableList();
				Become(Ready);
				Stash.UnstashAll();
			});
			ReceiveAny(o => Stash.Stash());
			using var scope = Context.CreateScope();
			var actors = scope.ServiceProvider.GetService<IActors>();
			actors.BuildServerService.Tell(new GetBuildActors(_screen.Builds));
		}

		private void Ready() {
			Receive<ScreenDataRequest>(msg => {
				Context.ActorOf(Props.Create(() => new Aggregator<BuildData, IActorRef>(_buildActors, Sender)))
					.Tell(GetBuildData.Instance);
			});
			Receive<AggregatorResponse<BuildData, IActorRef>>(msg => {
				msg.Metadata.Tell(new Screen {
					Id = Guid.NewGuid(),
					Type = ScreenType.BuildStatus,
					Data = new BuildScreenData(msg.Results.Values)
				});
			});
		}

		public IStash Stash { get; set; }

	}
}
