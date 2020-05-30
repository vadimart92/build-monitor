using System.Collections.Generic;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.Core.Actors
{
	public class GetBuildActors
	{
		public IList<BuildList> ScreenBuilds { get; }

		public GetBuildActors(IList<BuildList> screenBuilds) {
			ScreenBuilds = screenBuilds;
		}
	}
}
