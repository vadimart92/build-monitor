using Akka.Actor;
using BuildMonitor.Contracts.Configuration;
using BuildMonitor.Contracts.Models;
using BuildMonitor.TeamCity;

namespace BuildMonitor.Core.Actors
{
	public static class BuildServerActorPropsFactory
	{
		public static Props GetActorProps(this BuildServer buildServer) {
			var type = buildServer.Config.Type;
			if (type == BuildServerType.TeamCity) {
				return Props.Create(() =>
					new TeamCityBuildServerActor((TeamcityBuildServerConfig)buildServer.Config));
			}
			return null;
		}
	}
}
