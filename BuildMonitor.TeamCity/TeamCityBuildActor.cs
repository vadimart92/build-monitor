using System;
using Akka.Actor;
using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.TeamCity
{
	class TeamCityBuildActor : ReceiveActor
	{

		public TeamCityBuildActor(string buildId) {
			Receive<GetBuildData>(msg => {
				Sender.Tell(new BuildData {
					ViewType = BuildViewType.TeamCity,
					Config = new TeamCityBuildInfo {
						Id = buildId,
						Name = "teest name",
						Number = "smaple number",
						Status = BuildStatus.Success,
						Url = "http://aa.com",
						DurationSeconds = 1213,
						ProjectName = "test build " + buildId,
						StartedBy = "admin" + DateTime.Now.ToString("s"),
						StartedOn = DateTime.Now.AddDays(-1)
					}
				});
			});
		}
	}
}
