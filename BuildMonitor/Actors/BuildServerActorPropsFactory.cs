using Akka.Actor;
using BuildMonitor.Core.Configuration;
using BuildMonitor.Models;

namespace BuildMonitor.Actors
{
	public static class BuildServerActorPropsFactory
	{
		public static Props GetActorProps(this BuildServer buildServer) {
			var type = buildServer.Config.Type;
			if (type == BuildServerType.TeamCity) {
				return Props.Create(() => new TeamCityBuildServerActor());
			}
			return null;
		}
	}
}