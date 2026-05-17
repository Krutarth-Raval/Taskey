<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // Create a new task
    public function createTask(Request $request)
    {
        $request->validate([
            "title" => "required|min:3|max:100",
            "description" => "required|min:5",
            "status" => "nullable|in:pending,completed"
        ]);

        $task = $request->user()->tasks()->create([
            "title" => $request->title,
            "description" => $request->description,
            "status" => $request->status
        ]);

        return response()->json([
            "message" => "Task Created Successfully",
            "task" => $task,
        ]);
    }

    // Get all tasks
    public function getTasks(Request $request)
    {
        // for search and filter
        $search = $request->query('search');
        // for status filter
        $status = $request->query('status');

        $tasks = $request->user()
            ->tasks()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->get();

        return response()->json([
            "tasks" => $tasks,
        ]);
    }

    // get a single task by id
    public function getTaskById(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);


        return response()->json([
            "task" => $task,
        ]);

    }

    // update task by id
    public function updateTask(Request $request, $id)
    {
        $request->validate([
            "title" => "required|min:3|max:100",
            "description" => "required|min:5",
            "status" => "nullable|in:pending,completed"
        ]);

        $task = $request->user()->tasks()->findOrFail($id);

        $task->update([
            "title" => $request->title,
            "description" => $request->description,
            "status" => $request->status
        ]);

        return response()->json([
            "message" => "task updated",
            "task" => $task,
        ]);

    }

    //delete task

    public function deleteTask(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);


        $task->delete();

        return response()->json([
            "message" => " Task deleted",
        ]);


    }
}
