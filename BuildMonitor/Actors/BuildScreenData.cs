using System.Collections.Generic;
using System.Linq;

namespace BuildMonitor.Actors
{
	class BuildScreenData : IScreenData
	{
		public BuildScreenData(IEnumerable<BuildData> builds) {
			Builds = builds.ToList();
		}

		public IList<BuildData> Builds { get;  }
	}
}
