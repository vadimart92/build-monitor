using Akka.Actor;

namespace BuildMonitor.Core.Actors
{
	public interface IActors
	{
		public IActorRef ProfileService { get; }
		public IActorRef BuildServerService { get; }
		public IActorRef ProfileNotifier { get; }
	}


}
