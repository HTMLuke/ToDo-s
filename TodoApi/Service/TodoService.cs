using TodoApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace TodoApi.Services;

public class TodoService
{
    private readonly IMongoCollection<TodoItem> _TodoCollection;

    public TodoService(
        IOptions<TodoListDatabaseSettings> TodoListDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            TodoListDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            TodoListDatabaseSettings.Value.DatabaseName);

        _TodoCollection = mongoDatabase.GetCollection<TodoItem>(
            TodoListDatabaseSettings.Value.TodoCollectionName);
    }

    public async Task<List<TodoItem>> GetAsync() =>
        await _TodoCollection.Find(_ => true).ToListAsync();

    public async Task<TodoItem?> GetAsync(string id) =>
        await _TodoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TodoItem newTodo) =>
        await _TodoCollection.InsertOneAsync(newTodo);

    public async Task UpdateAsync(string id, TodoItem updatedTodo) =>
        await _TodoCollection.ReplaceOneAsync(x => x.Id == id, updatedTodo);

    public async Task RemoveAsync(string id) =>
        await _TodoCollection.DeleteOneAsync(x => x.Id == id);
}