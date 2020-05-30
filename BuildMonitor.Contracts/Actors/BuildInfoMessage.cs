namespace BuildMonitor.Contracts.Actors
{
	public class BuildInfoMessage
	{
		public BuildViewType ViewType { get; set; }
		public BuildInfo Config { get; set; }
	}
}