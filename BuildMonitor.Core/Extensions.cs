using System;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.DI.Core;
using Akka.DI.Extensions.DependencyInjection;
using BuildMonitor.Common.Actors;
using BuildMonitor.Core.Actors;
using Microsoft.Extensions.DependencyInjection;

namespace BuildMonitor.Core
{
	public static class Extensions
	{
		class Actors: IActors
		{
			public Actors(ActorSystem system) {
				ProfileService = system.ActorOf(system.DI().Props<ProfileServiceActor>(), "profileService");
				BuildServerService = system.ActorOf(system.DI().Props<BuildServerServiceActor>(), "buildServerService");
				ProfileNotifier = system.ActorOf(system.DI().Props<ProfileNotificationActor>(), "profileNotifier");
			}
			public IActorRef ProfileService { get; }
			public IActorRef BuildServerService { get; }
			public IActorRef ProfileNotifier { get; }
		}

		public static IServiceCollection AddActors(this IServiceCollection serviceCollection) {
			return serviceCollection
				.AddTransient<ProfileServiceActor>()
				.AddTransient<BuildServerServiceActor>()
				.AddTransient<ProfileNotificationActor>()
				.AddSingleton(provider => ActorSystem.Create("actors")
					.WithServiceProvider(provider)
					.WithServiceScopeFactory(provider.GetService<IServiceScopeFactory>()))
				.AddSingleton<IActors, Actors>();
		}

		public static void UseActors(this IServiceProvider serviceProvider) {
			var actorSystem = serviceProvider.GetRequiredService<ActorSystem>();
			actorSystem.UseServiceProvider(serviceProvider);
			serviceProvider.GetRequiredService<IActors>();
		}

		public static ActorSystem WithServiceScopeFactory(this ActorSystem system, IServiceScopeFactory serviceScopeFactory)
		{
			system.RegisterExtension(ServiceScopeExtensionIdProvider.Instance);
			ServiceScopeExtensionIdProvider.Instance.Get(system).Initialize(serviceScopeFactory);
			return system;
		}
		public static ActorSystem WithServiceProvider(this ActorSystem system, IServiceProvider serviceProvider)
		{
			system.RegisterExtension(ServiceProviderExtensionIdProvider.Instance);
			ServiceProviderExtensionIdProvider.Instance.Get(system).Initialize(serviceProvider);
			return system;
		}

		public static IServiceScope CreateScope(this IActorContext context) {
			return ServiceScopeExtensionIdProvider.Instance.Get(context.System).CreateScope();
		}

		public static async Task QueryDb(this IActorContext context, Func<ConfigDbContext, Task> action) {
			using var scope = context.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<ConfigDbContext>();
			await action(dbContext);
		}
		public static async Task<T> QueryDb<T>(this IActorContext context, Func<ConfigDbContext, Task<T>> action) {
			using var scope = context.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<ConfigDbContext>();
			return await action(dbContext);
		}
	}
}
