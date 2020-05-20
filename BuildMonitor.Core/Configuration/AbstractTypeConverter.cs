using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BuildMonitor.Core.Configuration
{
	class MapTypeAttribute : Attribute
	{
		public Type Type { get; }
		
		public MapTypeAttribute(Type type) {
			Type = type;
		}
	}

	internal sealed class StringEnumConverter<TEnum> : JsonConverter<TEnum>
	{
		public override TEnum Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
			var name = reader.GetString();
			return Enum.TryParse(typeof(TEnum), name, out var val) ? (TEnum)val : default;
		}

		public override void Write(Utf8JsonWriter writer, TEnum value, JsonSerializerOptions options) {
			var name = Enum.GetName(typeof(TEnum), value);
			if (options.PropertyNamingPolicy == JsonNamingPolicy.CamelCase) {
				name = $"{char.ToLowerInvariant(name[0])}{new String(name.Skip(1).ToArray())}";
			}
			writer.WriteStringValue(name);
		}
	}

	internal sealed class AbstractTypeConverter<TType, TEnumType>
		: JsonConverter<TType>
	{
		private static readonly Dictionary<string, Type> Map = new Dictionary<string, Type>();
		static AbstractTypeConverter() {
			var enumType = typeof(TEnumType);
			var typeMap = enumType.GetEnumNames().Select(enumType.GetMember)
				.Select(mi => mi.FirstOrDefault(m => m.DeclaringType == enumType))
				.Where(m => m != null)
				.Select(m => new { Name = m.Name, Attribute = m.GetCustomAttribute<MapTypeAttribute>()})
				.Where(m => m.Name != null && m.Attribute != null)
				.ToList();
			foreach (var mapItem in typeMap) {
				Map[mapItem.Name.ToLowerInvariant()] = mapItem.Attribute.Type;
			}
		}
		public override TType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			using var document = JsonDocument.ParseValue(ref reader);
			var type = document.RootElement.GetProperty("type").GetString().ToLowerInvariant();
			if (!Map.TryGetValue(type, out var implType)) {
				return default;
			}
			var rawText = document.RootElement.GetRawText();
			var buildServer = (TType)JsonSerializer.Deserialize(rawText, implType, options);
			return buildServer;
		}

		public override void Write(Utf8JsonWriter writer, TType value, JsonSerializerOptions options) {
			JsonSerializer.Serialize(writer, value, value?.GetType() ?? typeof(TType), options);
		}
	}
}