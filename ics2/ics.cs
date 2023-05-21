using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using TodoApi.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB;
using MongoDB.Driver;
namespace TodoApi.Controllers;

class generadeics {
public readonly TodoService _TodoListService;
 public baum(TodoService todoService) =>
        _TodoListService = todoService;
    funktion test(_TodoListService todoService) {
        db.collection.CountDocumentsAsync(new BsonDocument());
        return document1;
    }
}