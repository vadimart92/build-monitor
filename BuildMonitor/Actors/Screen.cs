using System;
using BuildMonitor.Core.Configuration;

namespace BuildMonitor.Actors
{

	public interface IScreenData
	{

	}
	public class Screen
	{
		public Guid Id { get; set; }
		public ScreenType Type { get; set; }
		public IScreenData Data { get; set; }
	}
}
