using System;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.Contracts.Actors
{
	public class Screen
	{
		public Guid Id { get; set; }
		public ScreenType Type { get; set; }
		public IScreenData Data { get; set; }
	}
}
