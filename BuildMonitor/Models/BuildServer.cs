using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuildMonitor.Core.Configuration;

namespace BuildMonitor.Models
{
	public class BuildServer : IEntity
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; }
		public string Description { get; set; }
		public BuildServerConfig Config { get; set; }
	}
}
