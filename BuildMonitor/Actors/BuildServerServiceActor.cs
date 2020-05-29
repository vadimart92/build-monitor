using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Akka.Actor;
using BuildMonitor.Core.Configuration;
using BuildMonitor.Models;
using Microsoft.EntityFrameworkCore;

namespace BuildMonitor.Actors
{
	public class BuildServerServiceActor: ReceiveActor, IWithUnboundedStash
	{
		public BuildServerServiceActor() {
			Receive<GetBuildActors>(async msg => await GetBuildActors(msg));
			Receive<AggregatorResponse<IList<IActorRef>, IActorRef>>(results => {
				List<IActorRef> buildActors = results.Results.Values.SelectMany(list => list).ToList();
				results.Metadata.Tell(buildActors);
			});
		}

		async Task GetBuildActors(GetBuildActors msg) {
			await InitBuildServers(msg.ScreenBuilds.Select(s=> s.BuildServer));
			var buildServerActors = from buildList in msg.ScreenBuilds
				let actor = GetBuildServer(buildList.BuildServer)
				group buildList by actor;
			var builds = buildServerActors.ToDictionary(g => g.Key, g => g.ToList());
			Context.ActorOf(Props.Create(() =>
				new DictionaryAggregator<IList<IActorRef>, IActorRef, List<BuildList>>(builds, Sender)));
		}

		private async Task InitBuildServers(IEnumerable<string> names) {
			var toInit = names.Select(n => new {Name = n, Ref = GetBuildServer(n)}).Where(s => s.Ref.IsNobody())
				.Select(s => s.Name).ToList();
			if (!toInit.Any()) return;
			var buildServers =
				await Context.QueryDb(context => context.BuildServers.Where(s => toInit.Contains(s.Name)).ToListAsync());
			foreach (var buildServer in buildServers) {
				var props = buildServer.GetActorProps();
				Context.ActorOf(props, buildServer.Name.ToLowerInvariant());
			}
		}

		IActorRef GetBuildServer(string name) => Context.Child(name.ToLowerInvariant());
		public IStash Stash { get; set; }
	}
}
