using System.Collections.Generic;
using System.Linq;

namespace BuildMonitor.Contracts.Actors
{
	public class BuildScreenData : IScreenData
	{
		public BuildScreenData(IEnumerable<BuildInfoMessage> builds) {
			Builds = builds.ToList();
		}

		public IList<BuildInfoMessage> Builds { get;  }
	}
}
