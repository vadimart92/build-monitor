using System;

namespace BuildMonitor.Actors
{
	public class BuildInfo
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Number { get; set; }
		public BuildStatus Status { get; set; }
		public string Url { get; set; }
		public string StartedBy { get; set; }
		public DateTime StartedOn { get; set; }
		public int DurationSeconds { get; set; }
	}
}