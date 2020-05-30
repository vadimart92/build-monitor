using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.TeamCity
{
	public class TeamCityBuildInfo : BuildInfo
	{
		public string ProjectName { get; set; }
		public string StatusText { get; set; }

		public static TeamCityBuildInfo Empty(string id) {
			return new TeamCityBuildInfo {
				Id = id,
				Name = "loading"
			};
		}
	}
}
