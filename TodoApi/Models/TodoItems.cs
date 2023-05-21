using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApi.Models
{
    public class TodoItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public bool IsComplete { get; set; } = false;
        public string? day { get; set;} = "";
        public string? month { get; set;} = "";
        public int year { get; set;} = 0;
        public string? Secret { get; set; } = "";
    }
}