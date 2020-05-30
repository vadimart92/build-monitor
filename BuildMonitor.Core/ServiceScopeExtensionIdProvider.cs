using Akka.Actor;

namespace BuildMonitor.Core
{
	public class ServiceScopeExtensionIdProvider : ExtensionIdProvider<ServiceScopeExtension>
	{
		public override ServiceScopeExtension CreateExtension(ExtendedActorSystem system)
		{
			return new ServiceScopeExtension();
		}

		public static readonly ServiceScopeExtensionIdProvider Instance = new ServiceScopeExtensionIdProvider();
	}
}