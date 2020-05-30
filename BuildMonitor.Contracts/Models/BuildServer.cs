using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuildMonitor.Contracts.Configuration;

namespace BuildMonitor.Contracts.Models
{
	public class BuildServer : IEntity
	{
		private BuildServerConfig _config;

		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; }
		public string Description { get; set; }

		public BuildServerConfig Config {
			get => _config;
			set {
				_config = value;
				Name = value?.Name;
			}
		}

		public string Name { get; set; }
	}
}
