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

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    
    public readonly TodoService _TodoListService;

    public TodoController(TodoService todoService) =>
        _TodoListService = todoService;

    [HttpGet]
    public async Task<List<TodoItem>> Get() =>
        await _TodoListService.GetAsync();
        

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<TodoItem>> Get(string id)
    {
        var todo = await _TodoListService.GetAsync(id);

        if (todo is null)
        {
            return NotFound();
        }

        return todo;
    }

    [HttpPost]
    public async Task<IActionResult> Post(TodoItem newTodo)
    {
       
        await _TodoListService.CreateAsync(newTodo);
        var id = newTodo.Id;
        var todo = await _TodoListService.GetAsync(id);
        var test = todo.Name;
        int datesec = int.Parse(todo.day);
        var yearsec = todo.year;
        int monthsec = int.Parse(todo.month);
        if (test == "")
        {

            await _TodoListService.RemoveAsync(id);
            return NoContent();
        }
        if (datesec <= 0 || datesec > 31)
        {
            await _TodoListService.RemoveAsync(id);
            return NoContent();
        }

        if (monthsec <= 0 || monthsec > 12)
        {
            await _TodoListService.RemoveAsync(id);
            return NoContent();
        }

        if (yearsec <= 1000)
        {
            await _TodoListService.RemoveAsync(id);
            return NoContent();
        }
        
        return CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, TodoItem updatedTodo)
    {
        var todo = await _TodoListService.GetAsync(id);
        var test = updatedTodo.Name;
        if (test == "")
        {
            return NoContent();
        }

        if (todo is null)
        {
            return NotFound();
        }

        updatedTodo.Id = todo.Id;

        await _TodoListService.UpdateAsync(id, updatedTodo);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var todo = await _TodoListService.GetAsync(id);

        if (todo is null)
        {
            return NotFound();
        }

        await _TodoListService.RemoveAsync(id);

        return NoContent();
    }

}




