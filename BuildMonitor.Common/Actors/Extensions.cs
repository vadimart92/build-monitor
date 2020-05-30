using Akka.Actor;

namespace BuildMonitor.Common.Actors
{
	public static class Extensions
	{

		public static IActors GetActors(this IActorContext context) {
			return ServiceProviderExtensionIdProvider.Instance.Get(context.System).GetService<IActors>();
		}

	}
}
