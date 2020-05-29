using System;
using Akka.Actor;
using BuildMonitor.Actors;

class TeamCityBuildActor : ReceiveActor
{

	public TeamCityBuildActor() {
		Receive<GetBuildData>(msg => {
			Sender.Tell(new BuildData {
				ViewType = BuildViewType.TeamCity,
				Config = new TeamCityBuildInfo {
					Id = "test id",
					Name = "teest name",
					Number = "smaple number",
					Status = BuildStatus.Success,
					Url = "http://aa.com",
					DurationSeconds = 1213,
					ProjectName = "test project",
					StartedBy = "admin" + DateTime.Now.ToString("s"),
					StartedOn = DateTime.Now.AddDays(-1)
				}
			});
		});
	}
}
