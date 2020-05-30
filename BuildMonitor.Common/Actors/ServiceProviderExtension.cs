using System;
using Akka.Actor;
using Microsoft.Extensions.DependencyInjection;

namespace BuildMonitor.Common.Actors
{
	public class ServiceProviderExtension : IExtension
	{
		private IServiceProvider _serviceProvider;
		public void Initialize(IServiceProvider serviceProvider) {
			_serviceProvider = serviceProvider;
		}

		public TService GetService<TService>() => _serviceProvider.GetService<TService>();
	}
	public class ServiceProviderExtensionIdProvider : ExtensionIdProvider<ServiceProviderExtension>
	{
		public override ServiceProviderExtension CreateExtension(ExtendedActorSystem system) =>
			new ServiceProviderExtension();

		public static readonly ServiceProviderExtensionIdProvider Instance = new ServiceProviderExtensionIdProvider();
	}
}
