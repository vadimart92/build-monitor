using System.Text.Json;
using BuildMonitor.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BuildMonitor
{
	public class ConfigDbContext : DbContext
	{
		public ConfigDbContext(DbContextOptions<ConfigDbContext> options)
			:base(options) {
		}
		public DbSet<Profile> Profiles { get; set; }
		public DbSet<BuildServer> BuildServers { get; set; }
		
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Profile>()
				.Property(b => b.Config )
				.HasJsonConversion();
			modelBuilder.Entity<BuildServer>()
				.Property(b => b.Config)
				.HasJsonConversion();
		}
	}
	public static class PropertyBuilderExtensions
	{
		public static PropertyBuilder<T> HasJsonConversion<T>(this PropertyBuilder<T> propertyBuilder) where T : class
		{
			var settings = new JsonSerializerOptions() {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			};
			ValueConverter<T, string> converter = new ValueConverter<T, string>
			(
				v => JsonSerializer.Serialize(v, settings),
				v => JsonSerializer.Deserialize<T>(v, settings) ?? default(T)
			);

			ValueComparer<T> comparer = new ValueComparer<T>
			(
				(l, r) => JsonSerializer.Serialize(l, settings) == JsonSerializer.Serialize(r, settings),
				v => v == null ? 0 : JsonSerializer.Serialize(v, settings).GetHashCode(),
				v => JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(v, settings), settings)
			);

			propertyBuilder.HasConversion(converter);
			propertyBuilder.Metadata.SetValueConverter(converter);
			propertyBuilder.Metadata.SetValueComparer(comparer);
			propertyBuilder.HasColumnType("jsonb");

			return propertyBuilder;
		}
	}
}