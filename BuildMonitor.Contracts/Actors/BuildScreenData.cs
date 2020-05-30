using System.Collections.Generic;
using System.Linq;

namespace BuildMonitor.Contracts.Actors
{
	public class BuildScreenData : IScreenData
	{
		public BuildScreenData(IEnumerable<BuildData> builds) {
			Builds = builds.ToList();
		}

		public IList<BuildData> Builds { get;  }
	}
}
