using System;

namespace BuildMonitor.Contracts.Models
{
	public interface IEntity
	{
		public Guid Id { get; set; }
	}
}