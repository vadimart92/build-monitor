using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	class MapTypeAttribute : Attribute
	{
		
		public string Name { get; }
		public Type Type { get; }
		
		public MapTypeAttribute(Type type, Type enumType, int enumValue) {
			Type = type;
			Name = enumType.GetEnumName(enumValue)?.ToLowerInvariant();
		}
	}
	internal sealed class BuildServerConverter
		: JsonConverter<BuildServer>
	{
		private static readonly Dictionary<string, Type> _map = new Dictionary<string, Type>();
		static BuildServerConverter() {
			foreach (var mapTypeAttribute in typeof(BuildServer).GetCustomAttributes<MapTypeAttribute>()) {
				_map[mapTypeAttribute.Name] = mapTypeAttribute.Type;
			}
		}
		public override BuildServer Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			using var document = JsonDocument.ParseValue(ref reader);
			var type = document.RootElement.GetProperty("type").GetString().ToLowerInvariant();
			if (!_map.TryGetValue(type, out var implType)) {
				return default;
			}
			var rawText = document.RootElement.GetRawText();
			var buildServer = (BuildServer)JsonSerializer.Deserialize(rawText, implType, options);
			return buildServer;
		}

		public override void Write(Utf8JsonWriter writer, BuildServer value, JsonSerializerOptions options)
		{
			//value.WriteTo(writer);
		}
	}
}