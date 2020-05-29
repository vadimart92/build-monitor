using System.Collections.Immutable;
using BuildMonitor.Actors;

namespace BuildMonitor.Contracts
{
	class ProfileData
	{
		public IImmutableList<Screen> Screens { get; set; }
		public string Description { get; set; }
	}
}
