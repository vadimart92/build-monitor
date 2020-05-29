using System;
using System.Collections.Generic;
using BuildMonitor.Core.Configuration;

namespace BuildMonitor.Actors
{
	public class GetBuildActors
	{
		public IList<BuildList> ScreenBuilds { get; }

		public GetBuildActors(IList<BuildList> screenBuilds) {
			ScreenBuilds = screenBuilds;
		}
	}
}
