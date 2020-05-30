using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.Contracts.Models
{
	public class BuildServer : IEntity
	{

		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; }
		public string Description { get; set; }

		public BuildServerConfig Config { get; set; }

		public string Name {
			get => Config?.Name.ToLowerInvariant();
			private set { }
		}
	}
}
