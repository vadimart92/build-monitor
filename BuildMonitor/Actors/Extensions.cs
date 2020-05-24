using System;
using Akka.Actor;
using Akka.DI.Core;
using Akka.DI.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BuildMonitor.Actors
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
				.AddSingleton<ActorSystem>(provider => ActorSystem.Create("actors"))
				.AddSingleton<IActors, Actors>();
		}

		public static void UseActors(this IApplicationBuilder app) {
			var serviceProvider = app.ApplicationServices;
			var actorSystem = serviceProvider.GetRequiredService<ActorSystem>();
			actorSystem.UseServiceProvider(serviceProvider);
			serviceProvider.GetRequiredService<IActors>();
		}
	}
}
