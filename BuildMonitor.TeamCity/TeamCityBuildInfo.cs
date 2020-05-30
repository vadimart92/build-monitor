using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.TeamCity
{
	public class TeamCityBuildInfo : BuildInfo
	{
		public string ProjectName { get; set; }
	}
}
