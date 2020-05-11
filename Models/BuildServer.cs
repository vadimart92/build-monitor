﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuildMonitor.Models
{
	public class BuildServer
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Config { get; set; }
	}
}