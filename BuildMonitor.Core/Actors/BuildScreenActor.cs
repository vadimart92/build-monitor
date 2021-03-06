﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using Akka.Actor;
using BuildMonitor.Common.Actors;
using BuildMonitor.Contracts.Actors;
using BuildMonitor.Contracts.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Screen = BuildMonitor.Contracts.Actors.Screen;

namespace BuildMonitor.Core.Actors
{
	public class BuildScreenActor : ReceiveActor, IWithUnboundedStash
	{
		private readonly BuildStatusScreen _screen;
		private IImmutableList<IActorRef> _buildActors;
		private readonly IActorRef _buildServerService;

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
			_buildServerService = actors.BuildServerService;
			_buildServerService.Tell(new GetBuildActors(_screen.Builds));
		}

		private void Ready() {
			Receive<ScreenDataRequest>(msg => {
				Context.ActorOf(Props.Create(() => new Aggregator<BuildInfoMessage, IActorRef>(_buildActors, Sender)))
					.Tell(GetBuildInfoMessage.Instance);
			});
			Receive<AggregatorResponse<BuildInfoMessage, IActorRef>>(msg => {
				msg.Metadata.Tell(new Screen {
					Id = Guid.NewGuid(),
					Type = ScreenType.BuildStatus,
					Data = new BuildScreenData(msg.Results.Values)
				});
			});
		}

		protected override void PostStop() {
			base.PostStop();
			_buildServerService.Tell(ScreenStopped.Instance);
		}

		public IStash Stash { get; set; }

	}
}
