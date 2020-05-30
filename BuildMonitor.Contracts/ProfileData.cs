using System.Collections.Immutable;
using BuildMonitor.Contracts.Actors;

namespace BuildMonitor.Contracts
{
	public class ProfileData
	{
		public IImmutableList<Screen> Screens { get; set; }
		public string Description { get; set; }
	}
}
