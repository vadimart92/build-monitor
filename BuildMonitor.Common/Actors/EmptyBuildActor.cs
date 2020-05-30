using Akka.Actor;
using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.Common.Actors
{
	class EmptyBuildActor: ReceiveActor
	{
		public EmptyBuildActor(string error) {
			Receive<GetBuildInfoMessage>(info => {
				Sender.Tell(new BuildInfoMessage {
					ViewType = BuildViewType.Unknown,
					Config = new BuildInfo() {
						InternalError = error
					}
				});
			});
		}
	}
}