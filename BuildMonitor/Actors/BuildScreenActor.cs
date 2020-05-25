using System;
using System.Collections.Generic;
using Akka.Actor;
using BuildMonitor.Core.Configuration;

namespace BuildMonitor.Actors
{
	class BuildScreenData : IScreenData
	{
		public IList<BuildData> Builds { get; set; } = new List<BuildData>();
	}

	public enum BuildViewType
	{
		Unknown,
		TeamCity,
		Jenkins
	}

	public class BuildData
	{
		public BuildViewType ViewType { get; set; }
		public BuildInfo Config { get; set; }
	}

	public class TeamCityBuildInfo : BuildInfo
	{
		public string ProjectName { get; set; }
	}

	public class BuildInfo
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Number { get; set; }
		public BuildStatus Status { get; set; }
		public string Url { get; set; }
		public string StartedBy { get; set; }
		public DateTime StartedOn { get; set; }
		public int DurationSeconds { get; set; }
	}

	public enum BuildStatus
	{
		Undefined,
		Running,
		Success,
		Failed
	}

	public class BuildScreenActor : ReceiveActor
	{
		private BuildStatusScreen _screen;

		public BuildScreenActor(BuildStatusScreen screen) {
			_screen = screen;
			Become(Ready);
		}

		private void Ready() {
			Receive<ScreenDataRequest>(msg => {
				var screenData = new BuildScreenData() {
					Builds = {
						new BuildData {
							ViewType = BuildViewType.TeamCity,
							Config = new TeamCityBuildInfo {
								Id = "test id",
								Name = "teest name",
								Number = "smaple number",
								Status = BuildStatus.Success,
								Url = "http://aa.com",
								DurationSeconds = 1213,
								ProjectName = "test project",
								StartedBy = "admin",
								StartedOn = DateTime.Now.AddDays(-1)
							}
						}
					}
				};
				Sender.Tell(new Screen() {
					Id = Guid.NewGuid(),
					Type = ScreenType.BuildStatus,
					Data = screenData
				});
			});
		}

	}
}
